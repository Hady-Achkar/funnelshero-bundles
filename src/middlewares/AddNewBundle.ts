import {NextFunction, Response} from 'express'
import {AnalyticsType, CustomRequest, IAddNewBundle, SupportType} from '../types'

export default async (
	req: CustomRequest<IAddNewBundle>,
	res: Response,
	next: NextFunction,
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
		if (!collectCustomerInfo) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing collectCustomerInfo',
						field: 'collectCustomerInfo',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!analytics) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing analytics',
						field: 'analytics',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (analytics !== AnalyticsType.ADVANCED && analytics !== AnalyticsType.BASIC) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'wrong analytics format',
						field: 'analytics',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!aBTest) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing aBTest',
						field: 'aBTest',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!mobileNotifications) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing mobileNotifications',
						field: 'mobileNotifications',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!leadNotifications) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing leadNotifications',
						field: 'leadNotifications',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!affiliateCommission) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing affiliateCommission',
						field: 'affiliateCommission',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (isNaN(affiliateCommission)) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'affiliateCommission should be a number',
						field: 'affiliateCommission',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!allowedFunnels || allowedFunnels === 0) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing allowedFunnels',
						field: 'allowedFunnels',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (isNaN(allowedFunnels)) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'allowedFunnels should be a number',
						field: 'allowedFunnels',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!allowedVisitors || allowedVisitors === 0) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing allowedVisitors',
						field: 'allowedVisitors',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (isNaN(allowedVisitors)) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'allowedVisitors should be a number',
						field: 'allowedVisitors',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!title || title === '') {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing title',
						field: 'title',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!usersAllowed || usersAllowed === 0) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing usersAllowed',
						field: 'usersAllowed',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!branding) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing branding',
						field: 'branding',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!contactsSaved) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing contactsSaved',
						field: 'contactsSaved',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!domainSsl) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing domainSsl',
						field: 'domainSsl',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!freeDomain) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing freeDomain',
						field: 'freeDomain',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (isNaN(freeDomain)) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing freeDomain',
						field: 'freeDomain',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!exportReport) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing exportReport',
						field: 'exportReport',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!favIcon) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing favIcon',
						field: 'favIcon',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!optInPage) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing optInPage',
						field: 'optInPage',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!price) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing price',
						field: 'price',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!storage) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing storage',
						field: 'storage',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!support) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing support',
						field: 'support',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		if (support !== SupportType.BOTH && support !== SupportType.CHAT && support !== SupportType.EMAIL) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'Wrong support format',
						field: 'support',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!trialDuration) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing trialDuration',
						field: 'trialDuration',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!appointmentTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing appointmentTemplate',
						field: 'appointmentTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!hiringTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing hiringTemplate',
						field: 'hiringTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!quizTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing quizTemplate',
						field: 'quizTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!landingTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing landingTemplate',
						field: 'landingTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!questionsTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing questionsTemplate',
						field: 'questionsTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!leadGenerationTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing leadGenerationTemplate',
						field: 'leadGenerationTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}

		if (!multichoiceTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing multichoiceTemplate',
						field: 'multichoiceTemplate',
					},
				],
				requestTime: new Date().toISOString(),
			})
		}
		if (!influencerTemplate) {
			return res.status(400).json({
				status: 'Failure',
				errors: [
					{
						name: 'missing influencerTemplate',
						field: 'influencerTemplate',
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
