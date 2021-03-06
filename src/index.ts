import express from 'express'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import fileUpload from 'express-fileupload'
import {connectDB, initSentry} from './lib'
import {AuthorizedRouter, PublicRouter} from './routes'
import {Validateuser} from './middlewares'
import {TestingTrialWillEnd} from './controllers'
import router from './routes/publicRouter'

const main = async () => {
	dotenv.config()
	connectDB()
	initSentry()
	const app = express()
	app.use(cors())

	app.use(
		fileUpload({
			limits: {},
		}),
	)
	app.use((req, res, next) => {
		if (req.originalUrl === '/public/trial-end') {
			next();
		} else {
			bodyParser.json()(req, res, next);
			app.use(
				express.json({
					limit: '50mb',
				}),
			)
		}
	});
	app.use(multer().single(''))

	app.use('/', async (req, _, next) => {
		try {
			// @ts-ignore
			req.userIP = req.headers['x-real-ip']
			next()
		} catch (error) {
			console.log(error)
		}
	})

	app.use('/public', PublicRouter)
	app.use('/', Validateuser, AuthorizedRouter)
	app.listen(process.env.MAIN_PORT, () => {
		console.log(`[i] Server is listening on port ${process.env.MAIN_PORT}`)
	})
}
main()
