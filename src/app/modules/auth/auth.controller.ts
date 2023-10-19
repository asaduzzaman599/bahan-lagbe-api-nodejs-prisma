import catchAsync from "../../../shared/catch-async"
import responseData from "../../../shared/response"
import { IValidateUser } from "./auth.interface"
import { AuthService } from "./auth.service"

const signup = catchAsync(async (req, res)=>{
  const user = req.body

  const result = await AuthService.signUp(user)

  return responseData({
    result,
    message: 'User created successfully!'
  }, res)

})

const signIn = catchAsync(async (req, res)=>{

  const userCredential = req.body

  const result = await AuthService.signIn(userCredential)

  return responseData({
    message: "User signin successfully!",
    token: result
  }, res)

})

const resetPassword = catchAsync(async (req, res)=>{

  const userCredential = req.body
  const user = (req as any).user as IValidateUser

  const result = await AuthService.resetPassword(userCredential, user)

  return responseData({
    message: "User password updated successfully!",
    result
  }, res)

})


export const AuthController = {
  signup,
  signIn,
  resetPassword
} 