import {Request} from 'express'

export * from './Bundle'
export {IAddNewBundle} from './IAddNewBundle'

export interface CustomRequest<T> extends Request {
	body: T
}
