import httpStatus from "http-status"
import ApiError from "../../../errors/api-error"
import prismaClient from "../../../shared/prisma-client"
import { VehicleStatus } from "@prisma/client"

export const calculateTotal = async (startDate: Date,endDate: Date, vehicleId: string) =>{
  const vehicle = await prismaClient.vehicle.findUnique({
    where: {
      id: vehicleId,
      status: {
        not: VehicleStatus.NOTAVAILABLE
      }
    }
  })
  if(!vehicle)
  throw new ApiError(httpStatus.NOT_FOUND, "Vehicle Not found")

const startOfTheDate = new Date(new Date(startDate).setHours(0, 0, 0, 0));
const endOfTheDate = new Date(new Date(endDate).setHours(0, 0, 0, 0));

const timeDifference = endOfTheDate.getTime() - startOfTheDate.getTime();
if(timeDifference < 0)
throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Date selection!")
var daysDifference = timeDifference / (1000 * 60 * 60 * 24);
const total = vehicle.price * daysDifference
return total
}

export const BookingUtils = {
  calculateTotal
}