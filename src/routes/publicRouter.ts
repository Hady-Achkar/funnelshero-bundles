import express from 'express'
import {GetAllBundles, TestingTrialWillEnd} from '../controllers'

const router = express.Router()
router.route('/').get(GetAllBundles)
router.route('/trial-end').post(express.raw({type: 'application/json'}), TestingTrialWillEnd)

export default router