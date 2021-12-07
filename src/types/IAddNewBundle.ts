import {AnalyticsType, SupportType} from './Bundle'

export interface IAddNewBundle {
	readonly  title: string
	readonly  trialDuration: number
	readonly  price: number
	readonly  allowedFunnels: number
	readonly  collectCustomerInfo: boolean
	readonly  contactsSaved: number
	readonly  allowedVisitors: number
	readonly  analytics: AnalyticsType
	readonly  freeDomain: number
	readonly  optInPage: boolean
	readonly  usersAllowed: number
	readonly  domainSsl: number
	readonly  leadNotifications: boolean
	readonly  storage: number
	readonly  exportReport: boolean
	readonly  favIcon: boolean
	readonly  mobileNotifications: boolean
	readonly  support: SupportType
	readonly  branding: boolean
	readonly  affiliateCommission: number
	readonly  aBTest: boolean
	readonly  quizTemplate: boolean
	readonly  landingTemplate: boolean
	readonly  appointmentTemplate: boolean
	readonly  multichoiceTemplate: boolean
	readonly  questionsTemplate: boolean
	readonly  hiringTemplate: boolean
	readonly  influencerTemplate: boolean
	readonly  leadGenerationTemplate: boolean
}