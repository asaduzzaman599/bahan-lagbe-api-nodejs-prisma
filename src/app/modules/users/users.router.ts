import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewares/auth'
import { Role } from '@prisma/client'
import validateRequest from '../../middlewares/validate-request'
import { UserValidation } from './users.validation'

const router = express.Router()

router.route('/')
.get(auth(Role.admin), UserController.findUsers)
router.route('/create-admin')
.post(auth(Role.admin),validateRequest(UserValidation.createUserValidation), UserController.insertUser)

router.route('/:id')
.get(auth(Role.admin), UserController.findOneUser)
.patch(auth(Role.admin), validateRequest(UserValidation.updateUserValidation), UserController.updateUser)
.delete(auth(Role.admin), UserController.deleteUser)

export const UserRouter = router