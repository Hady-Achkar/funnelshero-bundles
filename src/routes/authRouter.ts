import express from 'express'
import {FacebookSignin, GoogleSignin, Signin, Signup} from '../controllers'
import {ValidateSignup} from '../middlewares'

const router = express()

router.route('/sign-up').post(ValidateSignup, Signup)
router.route('/sign-in').post(Signin)
router.route('/google').post(GoogleSignin)
router.route('/facebook').post(FacebookSignin)
export default router
