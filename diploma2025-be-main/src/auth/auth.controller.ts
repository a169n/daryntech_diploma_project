import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenGuard } from '../common/guards/refreshToken.guard';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
import { SignupDto } from './dto/signup.dto';
import { GoogleOauthGuard } from '../common/guards/google-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user and return tokens' })
  @ApiResponse({ status: 200, description: 'User authenticated successfully.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({ summary: 'Redirect to Google for OAuth' })
  async redirectGoogle(@Req() _req) {
    console.log('Redirecting to Google for authentication...');
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    console.log('Google callback received, user:', req.user);
    const { access_token, refresh_token } =
      await this.authService.loginWithGoogle(req.user);
    console.log('Generated JWT for user:', access_token);
    res.cookie('access_token', access_token, { httpOnly: true, secure: false });
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
    });

    console.log('Redirecting back to client app');
    return res.redirect('http://localhost:5173/');
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh user tokens' })
  refreshTokens(@Req() req: Request) {
    console.log('Request User:', req.user);
    const userId = req.user?.sub;
    const refreshToken = req.user?.refreshToken;
    if (!userId || !refreshToken) {
      throw new Error('User ID or Refresh Token not set in request.');
    }
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user by clearing tokens' })
  async logout(@Req() req: Request) {
    console.log('Request user object:', req.user);
    const userId = req.user?.userId;
    if (!userId) {
      console.error('Logging out failed: userId is undefined');
      throw new Error('User ID is not set in the request.');
    }
    console.log('Logging out user with ID:', userId);
    return this.authService.logout(userId);
  }

  @Post('initiate-password-reset')
  @ApiOperation({ summary: 'Initiate password reset process' })
  initiatePasswordReset(@Body() body: { email: string }) {
    return this.authService.initiatePasswordReset(body.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password using token' })
  resetPassword(
    @Body() body: { email: string; token: string; newPassword: string },
  ) {
    return this.authService.resetPassword(
      body.email,
      body.token,
      body.newPassword,
    );
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verify user email using token' })
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    await this.authService.verifyEmail(token);

    res.send('Email successfully verified');
  }
}
