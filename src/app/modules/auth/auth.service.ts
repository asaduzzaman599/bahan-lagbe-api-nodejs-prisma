import { User } from "@prisma/client"
import prismaClient from "../../../shared/prisma-client"
import bcrypt from "bcrypt"
import config from "../../../config"
import httpStatus from "http-status"
import { JwtHelpers } from "../../../helpers/jwt-helpers"

const signIn = async (payload: {email: string; password: string}) => {
  const userExist = await prismaClient.user.findUnique({where:{
    email: payload.email
  }})

  if(!userExist)
  console.log(httpStatus.NOT_FOUND, 'User does not exist!');

  if(userExist?.password && !(await bcrypt.compare(payload.password, userExist?.password)))
    console.log(httpStatus.BAD_REQUEST, 'Email or Password not matched!');

    const accessToken = JwtHelpers.generateToken({userId: userExist?.id, role: userExist?.role})

    return accessToken
}
const signUp = async (payload: User) => {
  const password = payload.password

  payload.password = await bcrypt.hash(password, config.BCRYPT_SALT_ROUNDS)

  const createdUser = await prismaClient.user.create({
    data: payload
  }) 

  if(!createdUser) console.log(httpStatus.EXPECTATION_FAILED, 'User created failed')

  const user: Partial<User | null> = await prismaClient.user.findFirst({
    where:{
      id: createdUser.id
    }
  })

  delete user?.password

  return user
}


export const AuthService = {
  signUp,
  signIn
} 