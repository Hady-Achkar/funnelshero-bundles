<<<<<<< HEAD
export { IUser, UserType } from './IUser';
import { Request } from 'express';
export { ISignup } from './Signup.body';
export { ISignin } from './Signin.body';

export interface CustomRequest<T> extends Request {
  readonly body: T;
=======
import {Request} from 'express'

export * from './Bundle'
export {IAddNewBundle} from './IAddNewBundle'

export interface CustomRequest<T> extends Request {
	body: T
>>>>>>> c02de56 (Init commit with new bundle route)
}
