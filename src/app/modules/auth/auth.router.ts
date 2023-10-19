import express from "express";
import validateRequest from "../../middlewares/validate-request";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth"
import { Role } from "@prisma/client"

const router = express.Router();

router
  .route("/signup")
  .post(
    validateRequest(AuthValidation.signUpAuthZodSchema),
    AuthController.signup
  );
router
  .route("/signin")
  .post(
    validateRequest(AuthValidation.signInAuthZodSchema),
    AuthController.signIn
  );
router
  .route("/reset-password")
  .post(
    auth(Role.admin, Role.super_admin, Role.customer),
    validateRequest(AuthValidation.resetPasswordAuthZodSchema),
    AuthController.resetPassword
  );

export const AuthRouter = router;
