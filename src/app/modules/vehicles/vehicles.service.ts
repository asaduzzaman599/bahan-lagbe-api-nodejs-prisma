import { Prisma, Vehicle } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/api-error";
import paginationHelpers, {
  IPaginationOption,
} from "../../../helpers/pagination-helpers";
import prismaClient from "../../../shared/prisma-client";
import { IFilterOption } from "./vehicles.interface";

const insertVehicle = async (payload: Vehicle): Promise<Vehicle> => {
  const exist = await prismaClient.vehicle.findFirst({
    where: {
      plateNumber: payload.plateNumber,
    },
  });

  if (exist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Vehicle already exist with same plate number!"
    );
  }
  const createdVehicle = await prismaClient.vehicle.create({
    data: payload,
  });

  return createdVehicle;
};

const updateVehicle = async (
  id: string,
  payload: Vehicle
): Promise<Vehicle | null> => {
  const vehicleExist = await prismaClient.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (payload.plateNumber) {
    const exist = await prismaClient.vehicle.findMany({
      where: {
        id: { not: payload.id },
      },
    });
    if (exist.length)
      throw new ApiError(
        httpStatus.CONFLICT,
        "Vehicle already exist with same plate number!"
      );
  }

  if (!vehicleExist)
    throw new ApiError(httpStatus.NOT_FOUND, "Vehicle not exists");

  const vehicle = await prismaClient.vehicle.update({
    where: {
      id,
    },
    data: payload,
  });

  return vehicle;
};

const deleteVehicle = async (id: string): Promise<Vehicle | null> => {
  const vehicleExist = await prismaClient.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!vehicleExist)
    throw new ApiError(httpStatus.NOT_FOUND, "Vehicle not exists");

  const vehicle = await prismaClient.vehicle.delete({
    where: {
      id,
    },
  });

  return vehicleExist;
};

const findOneVehicle = async (id: string): Promise<Vehicle | null> => {
  const vehicleExist = await prismaClient.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!vehicleExist)
    throw new ApiError(httpStatus.NOT_FOUND, "Vehicle not exists");

  return vehicleExist;
};

const findVehicles = async (
  filterOptions: IFilterOption,
  paginationOptions: IPaginationOption
) => {
  const { size, page, skip, sortBy, sortOrder } =
    paginationHelpers(paginationOptions);

  const andCondition = [];

  const { search, ...options } = filterOptions;
  if (Object.keys(options).length) {
    andCondition.push({
      AND: Object.entries(options).map(([field, value]) => {
        if (field === "minPrice") {
          return {
            price: {
              gte: Number(value),
            },
          };
        }

        if (field === "maxPrice") {
          return {
            price: {
              lte: Number(value),
            },
          };
        }

        return {
          [field]: value,
        };
      }),
    });
  }

  if (search)
    andCondition.push({
      OR: ["model", 'type'].map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });

  const whereCondition: Prisma.VehicleWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const vehicles = await prismaClient.vehicle.findMany({
    where: whereCondition,
    include: {
      bookings: true,
      category: true
    },
    skip,
    take: size,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const count = await prismaClient.vehicle.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      size,
      total: count,
      totalPage: !isNaN(count / size) ? Math.ceil(count / size) : 0,
    },
    data: vehicles,
  };
};

const findVehicleByCategory = async (id: string): Promise<Vehicle[]> => {
  const vehicles = await prismaClient.vehicle.findMany({
    where: {
      categoryId: id,
    },
  });

  return vehicles;
};

export const VehicleService = {
  insertVehicle,
  updateVehicle,
  deleteVehicle,
  findOneVehicle,
  findVehicles,
  findVehicleByCategory,
};
