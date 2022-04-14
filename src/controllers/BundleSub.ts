import {Request, Response} from 'express'
import {Stripe} from '../lib'
import {Users} from '../models'
import {UserState} from '../types'

export const BundleSub = async (req: Request, res: Response) => {
	try {
		const {productPriceId, paymentMethod} = req.body
		//@ts-ignore
		const {stripeId, _id: UserId} = req.user
		if (!productPriceId || productPriceId === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing productPriceId',
						field: 'productPriceId',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		const _verifyUser = await Users.findById(UserId)
		if (!_verifyUser) {
			return res.status(400).json({
				status: 'Failure',
				message: 'User was not found',
				requestTime: new Date().toISOString(),
			})
		}
		const {email: UserEmail} = _verifyUser
		const _verifyPriceProductId = await Stripe.prices?.retrieve(productPriceId)
		if (!_verifyPriceProductId.unit_amount) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: 'Something went wrong',
				requestTime: new Date().toISOString(),
			})
		}
		const _verifyStripeUser = await Stripe.customers?.retrieve(stripeId)
		if (!_verifyStripeUser) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Customer was not found in stripe',
				customer: null,
				requestTime: new Date().toISOString(),
			})
		}
		const paymentIntent = await Stripe.paymentIntents.create({
			amount: _verifyPriceProductId.unit_amount,
			currency: 'usd',
			receipt_email: UserEmail,
			customer: stripeId,
		})
		if (!paymentIntent) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: 'Something went wrong',
				requestTime: new Date().toISOString(),
			})
		}
		const paymentIntentConfirm = await Stripe.paymentIntents.confirm(
			paymentIntent.id,
			{payment_method: paymentMethod}
		)
		if (paymentIntentConfirm && paymentIntentConfirm.status === 'succeeded') {
			const updatedCustomer = await Users.findByIdAndUpdate(
				UserId,
				{
					$set: {
						activeSubscription: _verifyUser.activeSubscription,
						activePrice: _verifyUser.activeSubscription,
						status: UserState.SUB_ACTIVE,
					},
				},
				{
					new: true,
				}
			)
			res.status(200).json({
				status: 'Success',
				message: 'Payment was done successfully',
				paymentInvoice: paymentIntentConfirm,
				user: updatedCustomer,
				requestTime: new Date().toISOString(),
			})
		} else {
			// Implement payment failed here
			return res.status(500).json({
				message: 'Internal Server Error',
				error: 'Something went wrong',
				requestTime: new Date().toISOString(),
			})
		}
	} catch (err) {
		if (err instanceof Error) {
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
}
