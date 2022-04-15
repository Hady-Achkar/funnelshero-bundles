import express from 'express'
import {CreateNewBundle} from '../controllers'
import {ValidateNewBundle} from '../middlewares'

const router = express.Router()

router.route('/').post(ValidateNewBundle, CreateNewBundle)

export default router