import express from 'express'
import {AddNewPaymentMethod, BundleSub, CreateCustomer, CreateNewBundle} from '../controllers'
import {ValidateNewBundle} from '../middlewares'

const router = express.Router()

router.route('/').post(ValidateNewBundle, CreateNewBundle)
router.route('/customer').post(CreateCustomer)
router.route('/sub').post(BundleSub)
router.route('/payment').post(AddNewPaymentMethod)
export default router
