import { Role, User } from "@prisma/client"
import prismaClient from "../../../shared/prisma-client"
import bcrypt from "bcrypt"
import config from "../../../config"
import httpStatus from "http-status"
import { JwtHelpers } from "../../../helpers/jwt-helpers"
import ApiError from "../../../errors/api-error"
import { IValidateUser, resetPasswordInput } from "./auth.interface"

const signIn = async (payload: {email: string; password: string}) => {
  const userExist = await prismaClient.user.findUnique({where:{
    email: payload.email
  }})

  if(!userExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');

  if(userExist?.password && !(await bcrypt.compare(payload.password, userExist?.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or Password not matched!');

    const accessToken = JwtHelpers.generateToken({userId: userExist?.id, role: userExist?.role})

    return accessToken
}
const signUp = async (payload: User) => {
  const password = payload.password

  payload.password = await bcrypt.hash(password, config.BCRYPT_SALT_ROUNDS)

  const createdUser = await prismaClient.user.create({
    data: payload
  }) 

  if(!createdUser) throw new ApiError(httpStatus.EXPECTATION_FAILED, 'User created failed')

  const user: Partial<User | null> = await prismaClient.user.findFirst({
    where:{
      id: createdUser.id
    }
  })

  delete user?.password

  return user
}
const resetPassword = async (payload: resetPasswordInput, user: IValidateUser) => {
  const userExist = await prismaClient.user.findUnique({where:{
    id: user.userId
  }})

  if(!userExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');

  console.log(payload)

  if(userExist?.password && !(await bcrypt.compare(payload.oldPassword, userExist?.password)))
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or Password not matched!');

    const password = await bcrypt.hash(payload.newPassword, config.BCRYPT_SALT_ROUNDS)

    await prismaClient.user.update({
      where: {
        id: user.userId
      },
      data: {
        password
      }
    })

    return {modified: true}
}


export const AuthService = {
  signUp,
  signIn,
  resetPassword
} 