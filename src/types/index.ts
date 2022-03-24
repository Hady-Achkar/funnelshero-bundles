export { IUser, UserType } from './IUser';
import { Request } from 'express';
export { ISignup } from './Signup.body';
export { ISignin } from './Signin.body';

export interface CustomRequest<T> extends Request {
  readonly body: T;
}
