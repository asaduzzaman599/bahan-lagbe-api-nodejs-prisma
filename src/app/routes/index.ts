import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
import { UserRouter } from '../modules/users/users.router'
import { CategoryRouter } from '../modules/categories/categories.router'
import { VehicleRouter } from '../modules/vehicles/vehicles.router'
import { BookingRouter } from '../modules/bookings/bookings.router'
import { ReviewAndRatingRouter } from '../modules/reviewAndRatings/reviewAndRatings.router'
import { FeedbackRouter } from '../modules/feedbacks/feedbacks.router'
import { ContentRouter } from '../modules/contents/contents.router'

const router = express.Router()


const routes = [
  {path: '/auth', module: AuthRouter},
  {path: '/users', module: UserRouter},
  {path: '/categories', module: CategoryRouter},
  {path: '/vehicles', module: VehicleRouter},
  {path: '/bookings', module: BookingRouter},
  {path: '/review-rating', module: ReviewAndRatingRouter},
  {path: '/feedbacks', module: FeedbackRouter},
  {path: '/contents', module: ContentRouter},
]

routes.forEach(route=>{
  router.use(route.path, route.module)
})

export const AppRouter = router