import {Request, Response} from 'express'
import {Bundles} from '../models'

export const GetAllBundles = async (
	req: Request,
	res: Response,
) => {
	try {
		const allBundles = await Bundles.find()
		return res.status(200).json({
			status: 'Success',
			message: 'Bundles were fetched successfully',
			bundles: allBundles,
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
