"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../../../errors/api-error"));
const pagination_helpers_1 = __importDefault(require("../../../helpers/pagination-helpers"));
const prisma_client_1 = __importDefault(require("../../../shared/prisma-client"));
const insertVehicle = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_client_1.default.vehicle.findFirst({
        where: {
            plateNumber: payload.plateNumber,
        },
    });
    if (exist) {
        throw new api_error_1.default(http_status_1.default.CONFLICT, "Vehicle already exist with same plate number!");
    }
    const createdVehicle = yield prisma_client_1.default.vehicle.create({
        data: payload,
    });
    return createdVehicle;
});
const updateVehicle = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleExist = yield prisma_client_1.default.vehicle.findUnique({
        where: {
            id,
        },
    });
    if (payload.plateNumber) {
        const exist = yield prisma_client_1.default.vehicle.findMany({
            where: {
                id: { not: payload.id },
            },
        });
        if (exist.length)
            throw new api_error_1.default(http_status_1.default.CONFLICT, "Vehicle already exist with same plate number!");
    }
    if (!vehicleExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "Vehicle not exists");
    const vehicle = yield prisma_client_1.default.vehicle.update({
        where: {
            id,
        },
        data: payload,
    });
    return vehicle;
});
const deleteVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleExist = yield prisma_client_1.default.vehicle.findUnique({
        where: {
            id,
        },
    });
    if (!vehicleExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "Vehicle not exists");
    const vehicle = yield prisma_client_1.default.vehicle.delete({
        where: {
            id,
        },
    });
    return vehicleExist;
});
const findOneVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleExist = yield prisma_client_1.default.vehicle.findUnique({
        where: {
            id,
        },
        include: {
            bookings: {
                include: {
                    reviewAndRatings: true
                }
            },
            category: true
        },
    });
    if (!vehicleExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "Vehicle not exists");
    return vehicleExist;
});
const findVehicles = (filterOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { size, page, skip, sortBy, sortOrder } = (0, pagination_helpers_1.default)(paginationOptions);
    const andCondition = [];
    const { search } = filterOptions, options = __rest(filterOptions, ["search"]);
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
    const whereCondition = andCondition.length > 0 ? { AND: andCondition } : {};
    const vehicles = yield prisma_client_1.default.vehicle.findMany({
        where: whereCondition,
        include: {
            bookings: {
                include: {
                    reviewAndRatings: true
                }
            },
            category: true
        },
        skip,
        take: size,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: "desc",
            },
    });
    const count = yield prisma_client_1.default.vehicle.count({
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
});
const findVehicleByCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicles = yield prisma_client_1.default.vehicle.findMany({
        where: {
            categoryId: id,
        },
    });
    return vehicles;
});
exports.VehicleService = {
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    findOneVehicle,
    findVehicles,
    findVehicleByCategory,
};
