import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewares/auth'
import { Role } from '@prisma/client'
import validateRequest from '../../middlewares/validate-request'
import { UserValidation } from './users.validation'

const router = express.Router()

router.route('/')
.get(auth(Role.admin, Role.super_admin), UserController.findUsers)

router.route('/create-admin')
.post(auth(Role.admin, Role.super_admin),validateRequest(UserValidation.createUserValidation), UserController.insertUser)

router.route('/:id')
.get(auth(Role.admin, Role.super_admin), UserController.findOneUser)
.patch(auth(Role.admin, Role.super_admin), validateRequest(UserValidation.updateUserValidation), UserController.updateUser)
.delete(auth(Role.admin,Role.super_admin), UserController.deleteUser)

export const UserRouter = router