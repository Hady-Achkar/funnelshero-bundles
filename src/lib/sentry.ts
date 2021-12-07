import * as Sentry from '@sentry/node'


export const initSentry = () => {

	Sentry.init({
		dsn: process.env.SENTRY_KEY || '',

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	})

// setTimeout(() => {
// 	try {
// 		foo();
// 	} catch (e) {
// 		Sentry.captureException(e);
// 	}
// }, 99);
}

