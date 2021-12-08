import express from 'express'
import {GetAllBundles} from '../controllers'

const router = express.Router()
router.route('/').get(GetAllBundles)
export default router