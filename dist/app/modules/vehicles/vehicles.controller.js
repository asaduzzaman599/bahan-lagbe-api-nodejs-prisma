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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const response_1 = __importDefault(require("../../../shared/response"));
const vehicles_service_1 = require("./vehicles.service");
const insertVehicle = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = req.body;
    const result = yield vehicles_service_1.VehicleService.insertVehicle(vehicle);
    return (0, response_1.default)({ message: "Vehicle inserted  successfully", result }, res);
}));
const updateVehicle = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield vehicles_service_1.VehicleService.updateVehicle(id, data);
    return (0, response_1.default)({ message: "Vehicle updated  successfully", result }, res);
}));
const deleteVehicle = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield vehicles_service_1.VehicleService.deleteVehicle(id);
    return (0, response_1.default)({ message: "Vehicle deleted  successfully", result }, res);
}));
const findOneVehicle = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield vehicles_service_1.VehicleService.findOneVehicle(id);
    return (0, response_1.default)({ message: "Vehicle fetched successfully", result }, res);
}));
const findVehicles = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const paginationOptions = (0, pick_1.default)(query, ['page', 'size', 'sortBy', 'sortOrder']);
    const filterOptions = (0, pick_1.default)(query, ['search', 'minPrice', 'maxPrice', 'status']);
    const result = yield vehicles_service_1.VehicleService.findVehicles(filterOptions, paginationOptions);
    return (0, response_1.default)({ message: "Vehicles retrieved successfully", result: { result: result.data, meta: result.meta } }, res);
}));
const findVehicleByCategory = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = req.params.categoryId;
    const query = req.query;
    const paginationOptions = (0, pick_1.default)(query, ['page', 'size', 'sortBy', 'sortOrder']);
    const filterOptions = (0, pick_1.default)(query, ['search', 'minPrice', 'maxPrice', 'status']);
    filterOptions.categoryId = categoryId;
    const result = yield vehicles_service_1.VehicleService.findVehicles(filterOptions, paginationOptions);
    return (0, response_1.default)({ message: "Vehicles with associated category data fetched successfully", result: { result: result.data, meta: result.meta } }, res);
}));
exports.VehicleController = {
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    findOneVehicle,
    findVehicles,
    findVehicleByCategory
};
