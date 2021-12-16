import {Request} from 'express'

export {IFunnel, IMenu, FunnelUser} from './Funnel'
export {IPage} from './Page'
export {IUser, ROLES} from './User'
export {ITemplate} from './ITemplate'
export {OptSubmits} from './OptSubmits'
export * from './Bundle'
export {IAddNewBundle} from './IAddNewBundle'
export {ITransaction, TransactionStatus} from './Transaction'

export interface CustomRequest<T> extends Request {
	body: T
}
