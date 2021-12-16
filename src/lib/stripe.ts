import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51K5v0rBfI0r8ox6OsiYU8bOv6Y8t96g7SbAjIa8KYZo9da0eHhmqhuA8nfCXRnuBQXQhYdB0OPPDINSsbzTVu7Wy00EBvByuPQ', {
	apiVersion: '2020-08-27',
})

export default stripe