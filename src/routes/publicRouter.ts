import express from 'express'
import {
	ConfigFront,
	GetAllBundles,
	TestingTrialWillEnd,
	CreatePaymentIntent,
} from '../controllers'

const router = express.Router()
router.route('/').get(GetAllBundles)
router
	.route('/trial-end')
	.post(express.raw({type: 'application/json'}), TestingTrialWillEnd)
router.route('/config').get(ConfigFront)
router.route('/client-secret').post(CreatePaymentIntent)

export default router
