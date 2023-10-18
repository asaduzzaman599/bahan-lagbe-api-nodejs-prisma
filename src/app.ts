import express, { Request, Response } from 'express'
import cors from 'cors'
import { AppRouter } from './app/routes'
import globalErrorHandler from './app/middlewares/global-error'
import httpStatus from 'http-status'
import config from './config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: config.ORIGIN_URL,
  credentials: true
}));


//routes
app.use("/api/v1", AppRouter)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `Server running on port: ${config.PORT}`,
  });

});

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