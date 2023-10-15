import {
  Booking,
  BookingStatus,
  Prisma,
  Role,
  VehicleStatus,
} from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/api-error";
import paginationHelpers, {
  IPaginationOption,
} from "../../../helpers/pagination-helpers";
import prismaClient from "../../../shared/prisma-client";
import { IValidateUser } from "../auth/auth.interface";
import { IFilterOption } from "../vehicles/vehicles.interface";
import { BookingUtils } from "./bookings.utils";

const insertBooking = async (payload: Booking): Promise<Booking> => {
  return await prismaClient.$transaction(async (trxClient) => {
    if (payload.status) {
      const existBooking = await trxClient.booking.findMany({
        where: {
          vehicleId: payload.vehicleId,
          status: {
            in: [BookingStatus.PENDING, BookingStatus.BOOKED],
          },
        },
      });
      if (existBooking.length)
        throw new ApiError(httpStatus.CONFLICT, "This vehicle already booked");
    }

    if (!payload.status) payload.status = BookingStatus.PENDING;

    const total = await BookingUtils.calculateTotal(
      payload.startTime,
      payload.endTIme,
      payload.vehicleId
    );

    const createdBooking = await trxClient.booking.create({
      data: { ...payload, total },
    });

    if (!createdBooking)
      throw new ApiError(httpStatus.BAD_REQUEST, "booking failed");

    await trxClient.vehicle.update({
      where: {
        id: createdBooking.vehicleId,
      },
      data: {
        status: VehicleStatus.BOOKED,
      },
    });

    return createdBooking;
  });
};

const updateBooking = async (
  id: string,
  payload: Booking,
  user: IValidateUser
): Promise<Booking> => {
  return await prismaClient.$transaction(async (trxClient) => {
    const exist = await trxClient.booking.findUnique({
      where: {
        id,
      },
    });
    if (user.role === Role.customer && exist?.userId !== user.userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    if (!exist) throw new ApiError(httpStatus.NOT_FOUND, "Booking not found!");

    if (payload.status) {
      if (
        (exist.status === BookingStatus.PENDING &&
          !(
            BookingStatus.BOOKED === payload.status ||
            BookingStatus.REJECT === payload.status ||
            BookingStatus.CANCELLED === payload.status
          )) ||
        (exist.status === BookingStatus.BOOKED &&
          !(
            BookingStatus.CANCELLED === payload.status ||
            BookingStatus.COMPLETED === payload.status
          )) ||
        exist.status === BookingStatus.CANCELLED ||
        exist.status === BookingStatus.REJECT ||
        exist.status === BookingStatus.COMPLETED
      ) {
        throw new ApiError(
          httpStatus.NOT_ACCEPTABLE,
          "Invalid status can not proceed"
        );
      }
      const existBooking = await trxClient.booking.findMany({
        where: {
          vehicleId: payload.vehicleId,
          status: {
            in: [BookingStatus.PENDING, BookingStatus.BOOKED],
          },
          id: {
            not: id,
          },
        },
      });

      if (existBooking.length)
        throw new ApiError(httpStatus.CONFLICT, "This vehicle already booked");
    }

    const total = await BookingUtils.calculateTotal(
      payload.startTime ?? exist.startTime,
      payload.endTIme ?? exist.endTIme,
      payload.vehicleId ?? exist.vehicleId
    );

    const updatedBooking = await trxClient.booking.update({
      where: {
        id,
      },
      data: { ...payload, total },
    });

    if (
      exist.status !== updatedBooking.status &&
      (updatedBooking.status === BookingStatus.CANCELLED ||
        updatedBooking.status === BookingStatus.COMPLETED ||
        updatedBooking.status === BookingStatus.REJECT)
    )
      await trxClient.vehicle.update({
        where: {
          id: updatedBooking.vehicleId,
        },
        data: {
          status: VehicleStatus.AVAILABLE,
        },
      });

    return updatedBooking;
  });
};

const findOneBooking = async (
  id: string,
  payload: IValidateUser
): Promise<Booking | null> => {
  const bookingExist = await prismaClient.booking.findUnique({
    where: {
      id,
    },
  });
  if (!bookingExist)
    throw new ApiError(httpStatus.NOT_FOUND, "Booking does not exist!");

  if (payload.role === Role.admin) return bookingExist;

  if (
    payload.role === Role.customer &&
    payload.userId !== bookingExist?.userId
  ) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized!");
  }

  return bookingExist;
};

const findBookings = async (
  payload: IValidateUser,
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
        if (field === "minTotal") {
          return {
            total: {
              gte: Number(value),
            },
          };
        }

        if (field === "maxTotal") {
          return {
            total: {
              lte: Number(value),
            },
          };
        }
        if (field === "minRating") {
          return {
            reviewAndRatings: {
              rating: {
                gte: Number(value),
              },
            },
          };
        }
        if (field === "rating") {
          return {
            reviewAndRatings: {
              rating: Number(value),
            },
          };
        }

        if (payload.role === Role.customer) {
          return {
            userId: payload.userId,
          };
        }

        return {
          [field]: value,
        };
      }),
    });
  }

  const whereCondition: Prisma.BookingWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const bookings = await prismaClient.booking.findMany({
    where: whereCondition,
    include: {
      vehicle: true,
      user: true,
      reviewAndRatings: true,
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
  const count = await prismaClient.booking.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      size,
      total: count,
      totalPage: !isNaN(count / size) ? Math.ceil(count / size) : 0,
    },
    data: bookings,
  };
};

export const BookingService = {
  insertBooking,
  findOneBooking,
  findBookings,
  updateBooking,
};
