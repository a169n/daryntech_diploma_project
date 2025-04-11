export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export const Errors = {
  // General Errors
  APP_URL_NOT_DEFINED: new AppError('APP_URL is not defined'),

  // Signup Errors
  PASSWORDS_DO_NOT_MATCH: new AppError('Passwords do not match'),
  USER_EXISTS: new AppError('User with this email or username already exists'),
  INVALID_COMPANY_ID: new AppError('Invalid company ID'),

  // Authentication Errors
  EMAIL_NOT_VERIFIED: new AppError('Your email is not verified.'),
  INVALID_TOKEN: new AppError('Invalid token'),
  EXPIRED_TOKEN: new AppError('Verification token has expired'),
  INVALID_CREDENTIALS: new AppError('Invalid credentials'),
  TOO_MANY_REQUESTS: new AppError('Too many requests. Try again later'),

  //User Management Errors
  USERNAME_EMAIL_CANNOT_BE_UPDATED: new AppError(
    'Username and email cannot be updated',
  ),
  PASSWORD_CONFIRM_PASSWORD_REQUIRED: new AppError(
    'Confirm password is required to update password',
  ),
  // Access & Authorization Errors
  ACCESS_DENIED: new AppError('Access Denied'),

  //Company Errors
  COMPANY_EXISTS: new AppError('Company already exists'),

  //Upload Errors
  INVALID_FILE_TYPE: new AppError('Only PDF files are allowed'),
  // Password Reset Errors
  USER_NOT_FOUND: new AppError('User not found'),
  INVALID_OR_EXPIRED_TOKEN: new AppError('Invalid or expired token'),
};
