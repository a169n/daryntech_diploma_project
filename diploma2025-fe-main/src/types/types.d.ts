export interface SignInFormFields {
  email: string;
  password: string;
}

export interface SignUpFormFields {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type Error = {
  message: string;
  error: string;
  statusCode: number;
};
