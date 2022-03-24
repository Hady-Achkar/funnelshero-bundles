import {User} from '../../models'
import {Response} from 'express'
import {CustomRequest, ISignup} from '../../types'
import * as jwt from 'jsonwebtoken'
import {UserType} from '../../types'
import {v4} from 'uuid'
import {Stripe} from '../../lib'

export default async (req: CustomRequest<ISignup>, res: Response) => {
	try {
		const {email, fname, lname, priceId} = req.body
		const password = v4()
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
		if (!fname || fname === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing fname',
						field: 'fname',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!lname || lname === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong/missing lname',
						field: 'lname',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}


		const _verify = await User.findOne({email})
		if (!_verify) {
			if (!priceId || priceId === '') {
				return res.status(400).json({
					status: 'Failure',
					errors: [
						{
							name: 'Wrong/missing priceId',
							field: 'priceId',
						},
					],
					requestTime: new Date().toISOString(),
				})
			}
			const _verifyPrice = await Stripe.prices?.retrieve(priceId)
			if (!_verifyPrice) {
				return res.status(404).json({
					status: 'Failure',
					message: 'Pricing was not found.',
					price: null,
					requestTime: new Date().toISOString(),
				})
			}
			const NEW_USER = await User.create({
				email,
				password,
				fname,
				lname,
				type: UserType.GOOGLE,
				activePrice: priceId,
			})
			const payload = {
				email,
				fullName: NEW_USER.fullName,
				_id: NEW_USER._id,
				stripeId: NEW_USER.stripeId,
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
						const paymentMethods = await Stripe.paymentMethods?.list({
							customer: NEW_USER.stripeId,
							type: 'card',
						})
						const subscriptions = await Stripe.subscriptions?.list({customer: NEW_USER.stripeId})

						return res.status(200).json({
							status: 'success',
							message: 'User account was created successfully.',
							token: encoded,
							fullName: NEW_USER.fullName,
							email: NEW_USER.email,
							_id: NEW_USER._id,
							type: UserType.GOOGLE,
							stripeId: NEW_USER.stripeId,
							paymentMethods: paymentMethods.data,
							subscriptions: subscriptions.data,
							inTrial: NEW_USER.inTrial,
							isTrialLegit: NEW_USER.isTrialLegit,
							activeSubscription: NEW_USER.activeSubscription,
							requestTime: new Date().toISOString(),
						})
					},
				)
			}
		} else {
			const USER = await User.findOne({
				email,
				type: UserType.GOOGLE,
			})
			//Useless check just to shut the linter
			if (!USER) {
				return res.status(404).json({
					status: 'Failure',
					message: 'Bad request, User was not found.',
					requestTime: new Date().toISOString(),
				})
			}
			const payload = {
				email,
				fullName: USER.fullName,
				_id: USER._id,
				stripeId: USER.stripeId,
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
						const paymentMethods = await Stripe.paymentMethods?.list({
							customer: USER.stripeId,
							type: 'card',
						})
						const subscriptions = await Stripe.subscriptions?.list({customer: USER.stripeId})

						return res.status(200).json({
							status: 'success',
							message: 'User account was created successfully.',
							token: encoded,
							fullName: USER.fullName,
							email: USER.email,
							_id: USER._id,
							type: UserType.GOOGLE,
							stripeId: USER.stripeId,
							paymentMethods: paymentMethods.data,
							subscriptions: subscriptions.data,
							inTrial: USER.inTrial,
							isTrialLegit: USER.isTrialLegit,
							activeSubscription: USER.activeSubscription,
							requestTime: new Date().toISOString(),
						})
					},
				)
			}
		}
	} catch (err) {
		if (err instanceof Error) {
			console.log(err.message)
			return res.status(500).json({
				message: 'Internal Server Error',
				error: err.message,
				requestTime: new Date().toISOString(),
			})
		}
	}
};
