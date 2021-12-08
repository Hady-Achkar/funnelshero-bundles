import express from 'express'
import {CreateNewBundle, GetAllBundles} from '../controllers'
import {ValidateNewBundle} from '../middlewares'

const router = express.Router()

router.route('/').post(ValidateNewBundle, CreateNewBundle)
router.route('/').get(GetAllBundles)

export default router
