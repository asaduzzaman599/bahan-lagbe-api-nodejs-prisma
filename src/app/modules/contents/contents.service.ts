import httpStatus from "http-status"
import prismaClient from "../../../shared/prisma-client"
import {Content} from "@prisma/client";
import ApiError from "../../../errors/api-error"

const insertContent = async (payload: Content): Promise<Content> => {
  const contentExist = await prismaClient.content.findFirst({
    where: {
      title: {equals: payload.title}
    }
  })
  if(contentExist) throw new ApiError(httpStatus.CONFLICT,'Content already exist!')
  const createdContent = await prismaClient.content.create({
    data: payload
  })


  return createdContent
}

const updateContent = async (id:string, payload: Content): Promise<Content | null> => {
  
  const contentExist = await prismaClient.content.findUnique({
    where: {
      id
    }
  })

  if(!contentExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'Content not exists')

  const content = await prismaClient.content.update({
    where: {
      id
    },
    data: payload
  })

  return content
}
 
const deleteContent = async (id:string): Promise<Content | null> => {
  
  const contentExist = await prismaClient.content.findUnique({
    where: {
      id
    },
  })

  if(!contentExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'Content not exists')

  const content = await prismaClient.content.delete({
    where: {
      id
    }
  })

  return contentExist
}

const findOneContent = async (id: string): Promise<Content | null> => {
  const contentExist = await prismaClient.content.findUnique({
    where: {
      id
    },
  })

  if(!contentExist)
  throw new ApiError(httpStatus.NOT_FOUND, 'Content not exists')

  return contentExist
}

const findContents = async (): Promise<Content[]> => {
  const contents = await prismaClient.content.findMany({
  })

  return contents
}




export const ContentService = {
  insertContent,
  updateContent,
  deleteContent,
  findOneContent,
  findContents
}