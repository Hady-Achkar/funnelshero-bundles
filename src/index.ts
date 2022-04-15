import express from 'express'
import * as dotenv from 'dotenv'
<<<<<<< HEAD
import {AuthRouter} from './routes'
=======
>>>>>>> c02de56 (Init commit with new bundle route)
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import fileUpload from 'express-fileupload'
<<<<<<< HEAD
import {connectDB} from './lib'
import morgan from 'morgan'

const main = async () => {
	dotenv.config()

	connectDB()
=======
import {connectDB,initSentry} from './lib'
import {IndexRouter} from './routes'
import {Validateuser} from './middlewares'

const main = async () => {
	dotenv.config()
	connectDB()
	initSentry()
>>>>>>> c02de56 (Init commit with new bundle route)
	const app = express()
	app.use(cors())
	app.use(
		express.json({
			limit: '50mb',
		}),
	)
<<<<<<< HEAD
	app.use(morgan('dev'))
=======
>>>>>>> c02de56 (Init commit with new bundle route)
	app.use(
		fileUpload({
			limits: {},
		}),
	)
	app.use(multer().single(''))

	app.use('/', async (req, _, next) => {
		try {
<<<<<<< HEAD
			const userIp = req.headers['x-real-ip']
			//@ts-ignore
			req.userIP = userIp
=======
			// @ts-ignore
			req.userIP = req.headers['x-real-ip']
>>>>>>> c02de56 (Init commit with new bundle route)
			next()
		} catch (error) {
			console.log(error)
		}
	})
	app.use(bodyParser.json())
<<<<<<< HEAD
	app.use('/', AuthRouter)
=======
	app.use('/', Validateuser, IndexRouter)
>>>>>>> c02de56 (Init commit with new bundle route)
	app.listen(process.env.MAIN_PORT, () => {
		console.log(`[i] Server is listening on port ${process.env.MAIN_PORT}`)
	})
}
main()
