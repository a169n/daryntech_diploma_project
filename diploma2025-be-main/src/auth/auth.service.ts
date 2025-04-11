import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from 'src/mail/mailer.service';
import { Errors } from 'src/common/errors/errors';

@Injectable()
export class AuthService {
  private emailRequestLog: Map<
    string,
    { count: number; lastRequestTime: number }
  >;
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {
    this.emailRequestLog = new Map();
  }

  private isRateLimited(email: string): boolean {
    const userLog = this.emailRequestLog.get(email);

    if (!userLog) {
      this.emailRequestLog.set(email, {
        count: 1,
        lastRequestTime: Date.now(),
      });
      return false;
    }

    const { count, lastRequestTime } = userLog;
    const timeSinceLastRequest = Date.now() - lastRequestTime;

    // Allow one request every 3 minutes
    if (timeSinceLastRequest > 180 * 1000) {
      this.emailRequestLog.set(email, {
        count: 1,
        lastRequestTime: Date.now(),
      });
      return false;
    }

    if (count >= 1) {
      return true; // Limit: 1 request per minute
    } else {
      this.emailRequestLog.set(email, { count: count + 1, lastRequestTime });
      return false;
    }
  }

  async signUp(signupDto: SignupDto): Promise<any> {
    const {
      email,
      password,
      confirmPassword,
      username,
      firstName,
      lastName,
      avatar,
      position,
      companyId,
    } = signupDto;

    if (password !== confirmPassword) {
      throw new BadRequestException(Errors.PASSWORDS_DO_NOT_MATCH.message);
    }

    const userExists = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (userExists) {
      throw new BadRequestException(Errors.USER_EXISTS.message);
    }

    if (companyId) {
      const companyExists = await this.prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!companyExists) {
        throw new BadRequestException(Errors.INVALID_COMPANY_ID.message);
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const clientUrl = process.env.CLIENT_URL;
    if (!clientUrl) {
      throw new Error(Errors.APP_URL_NOT_DEFINED.message);
    }

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        firstName,
        lastName,
        role: 'applicant',
        verificationToken,
        verificationTokenExpiry,
        isEmailVerified: false,
        ...(avatar && { avatar }),

        position,
        companyId,
      },
    });

    await this.mailerService.sendMail(
      email,
      'Verify your email',
      `<p>Please verify your email by clicking <a href="${clientUrl}/auth/verify-email?token=${verificationToken}">here.</a> This link will expire in 10 minutes.</p>`,
    );

    return {
      message: 'A verification email has been sent to your email address.',
    };
  }

  async verifyEmail(token: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) throw new BadRequestException(Errors.INVALID_TOKEN.message);

    if (user.verificationTokenExpiry < new Date()) {
      throw new BadRequestException(Errors.EXPIRED_TOKEN.message);
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return { message: 'Email successfully verified' };
  }

  async initiatePasswordReset(email: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new NotFoundException(Errors.USER_NOT_FOUND.message);

    const resetToken = uuidv4();
    await this.prisma.user.update({
      where: { email: user.email },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    const resetUrl = `${process.env.clientUrl}/auth/reset-password?token=${resetToken}`;

    const htmlContent = `
    <p>Dear User,</p>
    <p>It looks like you requested a password reset. No worries, we're here to help!</p>
    <p>To set a new password, please click on the link below. This link is valid for one hour:</p>
    <p><a href="${resetUrl}">Reset Your Password</a></p>
    <p>Once you click the link, you will be redirected to a secure page where you can provide your new password. Please ensure you enter this securely.</p>
    <p>If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
    <p>Best Regards,</p>
    <p>Aibyn, tech leader of JobConnect Company</p>
  `;

    await this.mailerService.sendMail(
      email,
      'Password Reset Request',
      htmlContent,
    );

    return { message: 'Password reset email sent' };
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email, resetToken: token },
    });

    if (!user || user.resetTokenExpiry < new Date()) {
      throw new BadRequestException(Errors.INVALID_OR_EXPIRED_TOKEN.message);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { message: 'Password successfully reset' };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (this.isRateLimited(email) && !user.isEmailVerified) {
      throw new BadRequestException(Errors.TOO_MANY_REQUESTS.message);
    }
    if (!user.isEmailVerified) {
      const currentTime = new Date();
      const clientUrl = process.env.CLIENT_URL;

      if (!clientUrl) {
        throw new Error(Errors.APP_URL_NOT_DEFINED.message);
      }

      let needsNewToken = false;

      if (
        !user.verificationTokenExpiry ||
        user.verificationTokenExpiry < currentTime
      ) {
        needsNewToken = true;

        const verificationToken = uuidv4();
        const verificationTokenExpiry = new Date(
          currentTime.getTime() + 10 * 60 * 1000,
        );

        await this.prisma.user.update({
          where: { email: user.email },
          data: { verificationToken, verificationTokenExpiry },
        });

        await this.mailerService.sendMail(
          email,
          'Verify your email',
          `<p>Please verify your email by clicking <a href="${clientUrl}/auth/verify-email?token=${verificationToken}">here.</a> This link will expire in 10 minutes.</p>`,
        );
      }

      if (needsNewToken) {
        this.emailRequestLog.set(email, {
          count: 1,
          lastRequestTime: Date.now(),
        });
      }

      return {
        message: 'A verification email has been sent to your email address.',
      };
    }

    // User is verified; proceed with login
    await this.prisma.user.update({
      where: { email: user.email },
      data: { lastLoginDate: new Date() },
    });

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.refreshToken)
      throw new ForbiddenException(Errors.ACCESS_DENIED.message);

    const refreshMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshMatches)
      throw new ForbiddenException(Errors.ACCESS_DENIED.message);

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  private async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS.message);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS.message);

    return user;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  private async getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: process.env.JWT_SECRET, expiresIn: '3h' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
      ),
    ]);

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async loginWithGoogle(user: User) {
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginDate: new Date() },
    });

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
}
