import express from 'express'
import cors from 'cors'
import { AppRouter } from './app/routes'
import globalErrorHandler from './app/middlewares/global-error'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());


//routes
app.use("/api/v1", AppRouter)


//global error handler
app.use(globalErrorHandler);

export default app;