import express from 'express'
import {
	AddNewPaymentMethod,
	CreateCustomer,
	CreateNewBundle,
	CreatePaymentIntent,
	GetCheckOutDetails,
} from '../controllers'
import {ValidateNewBundle} from '../middlewares'

const router = express.Router()

router.route('/').post(ValidateNewBundle, CreateNewBundle)
router.route('/customer').post(CreateCustomer)
router.route('/sub').post(CreatePaymentIntent)
router.route('/payment').post(AddNewPaymentMethod)
router.route('/checkout').get(GetCheckOutDetails)

export default router
