import { JwtPayload } from '../auth/jwt.strategy';

declare module 'express' {
  interface Request {
    user?: JwtPayload; // Adjust as needed to match your JWT payload structure
  }
}
