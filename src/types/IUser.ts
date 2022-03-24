export enum UserType {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
	STANDARD = 'STANDARD',
}

export interface IUser {
	fullName?: string
	fname: string
	lname: string
	password: string
	email: string
	type: UserType
	stripeId: string
	activeSubscription: string
	activePrice: string
	inTrial: boolean
	isTrialLegit: boolean
}
