import express from 'express'
import { ContentController } from './contents.controller'
import { Role } from '@prisma/client'
import auth from '../../middlewares/auth'
import { ContentValidation } from './contents.validation'
import validateRequest from '../../middlewares/validate-request'

const router = express.Router()

router.route('/create-content').post(validateRequest(ContentValidation.updateContentZodSchema), auth(Role.admin, Role.super_admin), ContentController.insertContent)

router.route('/')
.get(ContentController.findContents)

router.route('/:id')
.get(ContentController.findOneContent)
.patch(validateRequest(ContentValidation.updateContentZodSchema), auth(Role.admin, Role.super_admin), ContentController.updateContent)
.delete(auth(Role.admin, Role.super_admin), ContentController.deleteContent)

export const ContentRouter = router