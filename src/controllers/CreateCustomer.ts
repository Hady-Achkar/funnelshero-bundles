import {Request, Response} from 'express'
import {Stripe} from '../lib'

export const CreateCustomer = async (
	req: Request,
	res: Response,
) => {
	try {
		const customer = await Stripe.customers.create({
			email: 'mohammad.hammoud.lb@hotmail.com',
			payment_method: 'pm_card_visa',
			invoice_settings: {default_payment_method: 'pm_card_visa'},
			name: 'Mostafa Halabi',
		})
		// const customer = await Stripe.customers?.list({email:'mohammad.hammoud.lb@hotmail.com'})
		// console.log(customer)
		console.log(customer.id)
		const subs = await Stripe.products?.list({})
		console.log(subs)
		const newSub = await Stripe.subscriptions?.create({
			customer: customer.id,
			items: [{price: 'price_1K77pcBfI0r8ox6OSZrUoMeS'}], trial_from_plan:true
		})
		console.log(newSub)
		return res.status(200).json({
			status: 'Success',
			message: 'Stripe customer created successfully.',
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
