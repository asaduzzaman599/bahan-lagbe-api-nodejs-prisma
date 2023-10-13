import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
import { UserRouter } from '../modules/users/users.router'
import { CategoryRouter } from '../modules/categories/categories.router'
import { VehicleRouter } from '../modules/vehicles/vehicles.router'

const router = express.Router()


const routes = [
  {path: '/auth', module: AuthRouter},
  {path: '/users', module: UserRouter},
  {path: '/categories', module: CategoryRouter},
  {path: '/vehicles', module: VehicleRouter}
]

routes.forEach(route=>{
  router.use(route.path, route.module)
})

export const AppRouter = router