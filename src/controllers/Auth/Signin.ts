import {User} from '../../models'
import {Response} from 'express'
import {CustomRequest} from '../../types'
import {ISignin} from '../../types'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import {UserType} from '../../types'
import {Stripe} from '../../lib'

export default async (req: CustomRequest<ISignin>, res: Response) => {
	try {
		const {email, password} = req.body
		if (!email || email === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing email',
						field: 'email',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!password || password === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing password',
						field: 'password',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		const _user = await User.findOne({
			email,
		})
		if (!_user) {
			return res.status(404).json({
				status: 'Failure',
				message: 'Email was not found',
				requestTime: new Date().toISOString(),
			})
		} else {
			const _verifyLogin = await bcrypt.compare(password, _user.password)
			if (!_verifyLogin) {
				return res.status(401).json({
					status: 'Failure',
					message: 'Wrong credentials',
					requestTime: new Date().toISOString(),
				})
			}
			const payload = {
				email,
				fullName: _user.fullName,
				_id: _user._id,
				stripeId: _user.stripeId,
			}
			if (process.env.ACCESS_TOKEN_SECRET_V2) {
				jwt.sign(
					payload,
					process.env.ACCESS_TOKEN_SECRET_V2,
					{
						expiresIn: '24h',
					},
					async (_, encoded) => {
						console.log(`Access Token generated for Instructor : ${email}`)
						const stripeCustomerInfo = await Stripe.customers?.retrieve(_user.stripeId)
						const paymentMethods = await Stripe.paymentMethods?.list({
							customer: _user.stripeId,
							type: 'card',
						})
						const subscriptions = await Stripe.subscriptions?.list({
							customer: _user.stripeId,
							status: 'all',
							expand: ['data.default_payment_method'],
						})
						// const relatedProducts = await Stripe.prices?.list({customer: _user.stripeId})
						// console.log(relatedProducts)
						return res.status(200).json({
							status: 'success',
							message: 'User was logged in successfully.',
							token: encoded,
							fullName: _user.fullName,
							email: _user.email,
							_id: _user._id,
							type: UserType.STANDARD,
							stripeId: _user.stripeId,
							paymentMethods: paymentMethods.data,
							subscriptions: subscriptions.data,
							inTrial: _user.inTrial,
							isTrialLegit: _user.isTrialLegit,
							activeSubscription: _user.activeSubscription,
							requestTime: new Date().toISOString(),
						})
					},
				)
			}
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