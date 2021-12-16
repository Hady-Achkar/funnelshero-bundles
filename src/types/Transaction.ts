import {Document} from 'mongoose'
import {IUser} from './User'

export enum TransactionStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	DECLINED = 'DECLINED'
}

export interface ITransaction extends Document {
	transactionId: string
	user: IUser
	amount: number
	status: TransactionStatus
	bundle: string
}