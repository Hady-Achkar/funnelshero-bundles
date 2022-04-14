import express, {Request, Response} from 'express'
import {Stripe} from '../lib'

export default async (req: Request, res: Response) => {
	const {priceId} = req.body

	try {
		if (!priceId) {
			return res.status(404).json({
				message: 'Wrong price Id',
			})
		}
		const price = await Stripe.prices.retrieve(priceId)

		return res.status(200).json({
			message: 'Price was fetched successfully',
			price: price,
		})
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({
				message: 'Internal server error',
				error: error,
			})
		}
	}
	return res.status(500).json({
		message: 'Internal server error',
		error: 'Unable to retrieve price',
	})
}
