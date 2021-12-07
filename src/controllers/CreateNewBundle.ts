import {Response} from 'express'
import {CustomRequest, IAddNewBundle} from '../types'
import {Bundles} from '../models'

export const CreateNewBundle = async (
	req: CustomRequest<IAddNewBundle>,
	res: Response,
) => {
	try {
		const {
			collectCustomerInfo,
			analytics,
			aBTest,
			mobileNotifications,
			leadNotifications,
			affiliateCommission,
			allowedFunnels,
			allowedVisitors,
			appointmentTemplate,
			hiringTemplate,
			quizTemplate,
			landingTemplate,
			questionsTemplate,
			leadGenerationTemplate,
			multichoiceTemplate,
			influencerTemplate,
			title,
			usersAllowed,
			branding,
			contactsSaved,
			domainSsl,
			freeDomain,
			exportReport,
			favIcon,
			optInPage,
			price,
			storage,
			support,
			trialDuration,
		} = req.body

		const _verifyTitle = await Bundles.findOne({title})
		if (_verifyTitle) {
			return res.status(400).json({
				status: 'Failure',
				message: 'Bundle title already exists',
				requestTime: new Date().toISOString(),
			})
		}
		const newBundle = await Bundles.create({
			collectCustomerInfo,
			analytics,
			aBTest,
			mobileNotifications,
			leadNotifications,
			affiliateCommission,
			allowedFunnels,
			allowedVisitors,
			appointmentTemplate,
			hiringTemplate,
			quizTemplate,
			landingTemplate,
			questionsTemplate,
			leadGenerationTemplate,
			multichoiceTemplate,
			influencerTemplate,
			title,
			usersAllowed,
			branding,
			contactsSaved,
			domainSsl,
			freeDomain,
			exportReport,
			favIcon,
			optInPage,
			price,
			storage,
			support,
			trialDuration,
		})
		return res.status(200).json({
			status: 'Success',
			message: 'Bundle was created successfully',
			bundle: newBundle,
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
