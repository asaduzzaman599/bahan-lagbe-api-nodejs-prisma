import express from "express";
import validateRequest from "../../middlewares/validate-request";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

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

export const AuthRouter = router;
