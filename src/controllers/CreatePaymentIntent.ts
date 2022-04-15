import {Request, Response} from 'express'
import {Stripe} from '../lib'
import {Users} from '../models'
import {UserState} from '../types'

export default async (req: Request, res: Response) => {
	//@ts-ignore
	const {stripeId, _id: UserId} = req.user
	if (req.method === 'POST') {
		try {
			const {priceId, paymentMethodId} = req.body

			if (!priceId || priceId === '') {
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

			const paymentMethod = await Stripe.paymentMethods.attach(
				paymentMethodId,
				{customer: stripeId}
			)

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
			const subscription = await Stripe.subscriptions.create({
				customer: stripeId,
				items: [{price: priceId}],
			})

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
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
