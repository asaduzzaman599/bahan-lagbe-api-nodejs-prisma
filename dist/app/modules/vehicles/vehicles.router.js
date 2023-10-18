"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const vehicles_controller_1 = require("./vehicles.controller");
const validate_request_1 = __importDefault(require("../../middlewares/validate-request"));
const vehicles_validation_1 = require("./vehicles.validation");
const router = express_1.default.Router();
router.route('/create-vehicle').post((0, validate_request_1.default)(vehicles_validation_1.VehicleValidation.createVehicleZodSchema), (0, auth_1.default)(client_1.Role.admin), vehicles_controller_1.VehicleController.insertVehicle);
router.route('/').get(vehicles_controller_1.VehicleController.findVehicles);
router.route('/:categoryId/category').get(vehicles_controller_1.VehicleController.findVehicleByCategory);
router.route('/:id')
    .get(vehicles_controller_1.VehicleController.findOneVehicle)
    .patch((0, validate_request_1.default)(vehicles_validation_1.VehicleValidation.updateVehicleZodSchema), (0, auth_1.default)(client_1.Role.admin), vehicles_controller_1.VehicleController.updateVehicle)
    .delete((0, auth_1.default)(client_1.Role.admin), vehicles_controller_1.VehicleController.deleteVehicle);
exports.VehicleRouter = router;
