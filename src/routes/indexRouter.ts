import express from 'express'
import {CreateCustomer, CreateNewBundle, GetAllBundles, BundleSub} from '../controllers'
import {ValidateNewBundle} from '../middlewares'

const router = express.Router()

router.route('/').post(ValidateNewBundle, CreateNewBundle)
router.route('/customer').post(CreateCustomer)
router.route('/sub').post(BundleSub)

export default router
