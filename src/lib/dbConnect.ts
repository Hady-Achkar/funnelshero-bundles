<<<<<<< HEAD
import mongoose from 'mongoose';

export const connectDB = () => {
  const mongoURI = process.env.MONGO_URI || '';
  mongoose
    .connect(mongoURI, {
      useUnifiedTopology: true,
      writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 500,
      },
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then((res) => {
      console.log(`[i] Connected to database: ${mongoURI}`);
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
};
=======
import mongoose from 'mongoose'

export const connectDB = () => {
	const mongoURI = process.env.MONGO_URI || ''
	mongoose
		.connect(mongoURI, {
			useUnifiedTopology: true,
			writeConcern: {
				w: 'majority',
				j: true,
				wtimeout: 500,
			},
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then((res) => {
			console.log(`[i] Connected to database: ${mongoURI}`)
		})
		.catch((err) => {
			console.error(`Error: ${err.message}`)
			process.exit(1)
		})
}
>>>>>>> c02de56 (Init commit with new bundle route)
