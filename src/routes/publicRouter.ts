import express from 'express'
import {ConfigFront, GetAllBundles, TestingTrialWillEnd} from '../controllers'

const router = express.Router()
router.route('/').get(GetAllBundles)
router.route('/trial-end').post(express.raw({type: 'application/json'}), TestingTrialWillEnd)
router.route('/config').get(ConfigFront)

export default router