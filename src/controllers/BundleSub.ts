import {Request, Response} from 'express'
import {Stripe} from '../lib'

export const BundleSub = async (
	req: Request,
	res: Response,
) => {
	try {
		const {email, payment_method} = req.body

		const customer = await Stripe.customers.create({
			// payment_method: payment_method,
			email: email,
			name:'Mostafa Halabi',
		})
		console.log(customer)
		const subscription = await Stripe.subscriptions.create({
			customer: customer.id,
			items: [{price: 'price_1K77pcBfI0r8ox6OSZrUoMeS'}],
			trial_from_plan: true,
		})
		if (!subscription) {
			return res.status(400).json({
				status: 'Failure',
				message: 'subscription was not found',
				requestTime: new Date().toISOString(),
			})
		}
		// // @ts-ignore
		// const status = subscription['latest_invoice']['payment_intent']['status']
		// @ts-ignore
		// const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']
		// console.log(status)
		res.status(200).json({
			status: 'Success',
			message: 'Sub was created successfully',
			// clientSecret: client_secret,
			// subStatus: status,
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
