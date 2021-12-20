import {Request, Response} from 'express'
import {Stripe} from '../lib'
import {Users} from '../models'

export const BundleSub = async (
	req: Request,
	res: Response,
) => {
	try {
		const {productPriceId} = req.body
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
			return res.status(400).json({
				status: 'Failure',
				message: 'Product was not found',
				product: null,
				requestTime: new Date().toISOString(),
			})
		}
		const paymentIntent = await Stripe.paymentIntents.create({
			amount: _verifyPriceProductId.unit_amount,
			currency: 'usd',
			receipt_email: UserEmail,
		})
		const clientSecret = paymentIntent['client_secret']
		res.status(200).json({
			status: 'Success',
			message: 'Payment was prepared successfully',
			clientSecret: clientSecret,
			requestTime: new Date().toISOString(),
		})
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
