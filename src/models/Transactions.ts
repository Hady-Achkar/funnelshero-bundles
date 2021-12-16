import {Schema, model} from 'mongoose'
import {ITransaction} from '../types'

const transactionSchema = new Schema<ITransaction>({
		transactionId: {
			type: String,
			required: [true, 'TransactionId is a required field.'],
			trim: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'User is a required field.'],
		},
		amount: {
			type: Number,
			required: [true, 'Amount is a required field.'],
		},
		status: {
			type: String,
			trim: true,
			default: 'PENDING',
		},
		bundle: {
			type: Schema.Types.ObjectId,
			ref: 'Bundles',
			required: [true, 'Bundle is a required field.'],
		},
	},
	{
		timestamps: true,
		versionKey: false,
		minimize: false,
	})
export default model<ITransaction>('Transactions', transactionSchema)