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

const startOfTheDate = startDate.setHours(0, 0, 0, 0);
const endOfTheDate = endDate.setHours(0, 0, 0, 0);

const timeDifference = endOfTheDate - startOfTheDate;

var daysDifference = timeDifference / (1000 * 60 * 60 * 24);
return vehicle.price * daysDifference
}

export const BookingUtils = {
  calculateTotal
}