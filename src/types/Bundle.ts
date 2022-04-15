import {Document} from 'mongoose'

export enum SupportType {
	CHAT = 'CHAT',
	BOTH = 'BOTH',
	EMAIL = 'EMAIL'
}

export enum AnalyticsType {
	BASIC = 'BASIC',
	ADVANCED = 'ADVANCED'
}

export interface IBundle extends Document {
	title:string
	trialDuration: number
	price: number
	allowedFunnels: number
	collectCustomerInfo: boolean
	contactsSaved: number
	allowedVisitors: number
	analytics: AnalyticsType
	freeDomain: boolean
	optInPage: boolean
	usersAllowed: number
	domainSsl: number
	leadNotifications: boolean
	storage: number
	exportReport: boolean
	favIcon: boolean
	mobileNotifications: boolean
	support: SupportType
	branding: boolean
	affiliateCommission: number
	aBTest: boolean
	quizTemplate: boolean
	landingTemplate: boolean
	appointmentTemplate: boolean
	multichoiceTemplate: boolean
	questionsTemplate: boolean
	hiringTemplate: boolean
	influencerTemplate: boolean
	leadGenerationTemplate: boolean
}