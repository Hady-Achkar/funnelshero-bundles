import {Schema, model} from 'mongoose'
import {IBundle} from '../types'
import {NextFunction} from 'express'

const BundleSchema = new Schema<IBundle>({
	title: {
		type: String,
		trim: true,
		unique: true,
	},
	trialDuration: {
		type: Number,
		default: 14,
	},
	price: {
		type: Number,
		required: [true, 'Bundle price is required'],
	},
	allowedFunnels: {
		type: Number,
		required: [true, 'Number of allowed funnels is required'],
	},
	collectCustomerInfo: {
		type: Boolean,
		required: [true, 'Collecting customer information rule is required'],
	},
	contactsSaved: {
		type: Number,
		required: [true, 'Contact forms saves is required'],
	},
	allowedVisitors: {
		type: Number,
		required: [true, 'Number of allowed visits required'],
	},
	analytics: {
		type: String,
		default: 'BASIC',
	},
	freeDomain: {
		type: Number,
		required: [true, 'Free domain is required'],
	},
	optInPage: {
		type: Number,
		required: [true, 'Opt in page is required'],
	},
	usersAllowed: {
		type: Number,
		required: [true, 'Allowed visits is required'],
	},
	domainSsl: {
		type: Number,
		required: [true, 'Number of allowed domain SSL connections is required'],
	},
	leadNotifications: {
		type: Boolean,
		required: [true, 'Number of allowed domain SSL connections is required'],
	},
	storage: {
		type: Number,
		required: [true, 'Storage allowed is required'],
	},
	exportReport: {
		type: Boolean,
		required: [true, 'Report exporting is required'],
	},
	favIcon: {
		type: Boolean,
		required: [true, 'Fav icon edit is required'],
	},
	mobileNotifications: {
		type: Boolean,
		required: [true, 'Mobile notifications is required'],
	},
	support: {
		type: String,
		required: [true, 'Support plan is required'],
	},
	branding: {
		type: Boolean,
		required: [true, 'Funnels branding is required'],
	},
	affiliateCommission: {
		type: Number,
		required: [true, 'Affiliate Commission is required'],
	},
	aBTest: {
		type: Boolean,
		required: [true, 'A/B Test is required'],
	},
	quizTemplate: {
		type: Boolean,
		required: [true, 'Quiz Template is required'],
	},
	landingTemplate: {
		type: Boolean,
		required: [true, 'Landing Template is required'],
	},
	appointmentTemplate: {
		type: Boolean,
		required: [true, 'Appointment Template is required'],
	},
	multichoiceTemplate: {
		type: Boolean,
		required: [true, 'Multi-choice Template is required'],
	},
	questionsTemplate: {
		type: Boolean,
		required: [true, 'Questions Template is required'],
	},
	
	hiringTemplate: {
		type: Boolean,
		required: [true, 'Hiring Template is required'],
	},
	influencerTemplate: {
		type: Boolean,
		required: [true, 'Influencer Template is required'],
	},
	leadGenerationTemplate: {
		type: Boolean,
		required: [true, 'Lead Generation Template is required'],
	},
}, {
	timestamps: true,
	minimize: false,
	versionKey: false,
})
// @ts-ignore
BundleSchema.pre('save', async function(next: NextFunction) {
	// password are only hashed when they are modified or a new user is added
	this.title = this.title
		.split(' ')
		.map((val: string) => val.charAt(0).toUpperCase() + val.slice(1))
		.join(' ')
	next()
})
export default model<IBundle>('Bundles', BundleSchema)