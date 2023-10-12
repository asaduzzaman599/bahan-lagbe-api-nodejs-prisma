import express from 'express'
import cors from 'cors'
import { AppRouter } from './app/routes'
import globalErrorHandler from './app/middlewares/global-error'
import httpStatus from 'http-status'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors());


//routes
app.use("/api/v1", AppRouter)


//global error handler
app.use(globalErrorHandler);

//api not found handler
app.use(globalErrorHandler);
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Not Found',
      },
    ],
  });
});
export default app;