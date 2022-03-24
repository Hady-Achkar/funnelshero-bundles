import {NextFunction, Response} from 'express'
import {CustomRequest, ISignup} from '../types'

export const ValidateSignup = async (
	req: CustomRequest<ISignup>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {email, priceId, fname, lname, password} = req.body
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
		next()
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
