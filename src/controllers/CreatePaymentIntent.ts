import {Request, Response} from 'express'
import {Stripe} from '../lib'
import {Users} from '../models'
import {UserState} from '../types'

export default async (req: Request, res: Response) => {
	//@ts-ignore
	const {stripeId, _id: UserId} = req.user
	const {priceId, paymentMethodId} = req.body

	try {
		if (!priceId || priceId === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing priceId',
						field: 'priceId',
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

		const paymentMethod = await Stripe.paymentMethods.attach(paymentMethodId, {
			customer: stripeId,
		})

		const _customer = await Stripe.customers.retrieve(stripeId)

		console.log(_customer)

		//@ts-ignore
		if (_customer?.invoice_settings?.default_payment_method === null) {
			await Stripe.customers?.update(stripeId, {
				invoice_settings: {
					default_payment_method: paymentMethod?.id,
				},
			})
		}

		const priceData = await Stripe.prices.retrieve(priceId)

		// check if the price is recurring or not

		let subscription
		if (priceData.recurring !== null) {
			subscription = await Stripe.subscriptions.create({
				customer: stripeId,
				items: [{price: priceId}],
				expand: ['latest_invoice.payment_intent'],
			})
		} else {
			if (priceData.unit_amount) {
				const pi = await Stripe.paymentIntents.create({
					customer: stripeId,
					currency: 'usd',
					amount: priceData.unit_amount,
				})

				const confirmed = await Stripe.paymentIntents.confirm({
					id: pi.id,
					paymentMethod: {paymentMethodId},
				})

				if (
					confirmed.amount_received === 0 ||
					confirmed.amount_received === null
				) {
					return res
						.status(500)
						.json({statusCode: 500, message: 'payment was not received'})
				}
				subscription = pi
			} else {
				return res
					.status(500)
					.json({statusCode: 500, message: 'unit amount is undefined'})
			}
		}
		const updatedUser = await Users.findByIdAndUpdate(
			UserId,
			{
				$set: {
					activeSubscription: subscription.id,
					activePrice: priceId as string,
					status: UserState.SUB_ACTIVE,
				},
			},
			{
				new: true,
			}
		).select('-password')
		res.status(200).json({
			message: 'Subscription was created successfully',
			subscription: subscription.id,
			user: updatedUser,
		})
	} catch (err) {
		if (err instanceof Error) {
			res.status(500).json({statusCode: 500, message: err.message})
		}
	}
}
