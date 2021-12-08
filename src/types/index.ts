import {Request} from 'express'

export {IFunnel} from './Funnel'
export {IPage} from './Page'
export {IUser} from './User'
export {OptSubmits} from './OptSubmits'
export * from './Bundle'
export {IAddNewBundle} from './IAddNewBundle'

export interface CustomRequest<T> extends Request {
	body: T
}
