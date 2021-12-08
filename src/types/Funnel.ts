import {Document} from 'mongoose'
import {IPage} from '.'

export interface IFunnel extends Document {
	title: string
	owner: string
	metaTags: string
	category: string
	createdAt: Date
	updatedAt: Date
	baseDomain: string
	favIcon: string
	proDomain: string
	pages: IPage[]
	isActive:boolean
	publish: {
		pages: IPage[]
	}
	contactEmail: string
}
