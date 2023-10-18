"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRouter = void 0;
const express_1 = __importDefault(require("express"));
const contents_controller_1 = require("./contents.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const contents_validation_1 = require("./contents.validation");
const validate_request_1 = __importDefault(require("../../middlewares/validate-request"));
const router = express_1.default.Router();
router.route('/create-content').post((0, validate_request_1.default)(contents_validation_1.ContentValidation.createContentZodSchema), (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), contents_controller_1.ContentController.insertContent);
router.route('/')
    .get(contents_controller_1.ContentController.findContents);
router.route('/:id')
    .get(contents_controller_1.ContentController.findOneContent)
    .patch((0, validate_request_1.default)(contents_validation_1.ContentValidation.updateContentZodSchema), (0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), contents_controller_1.ContentController.updateContent)
    .delete((0, auth_1.default)(client_1.Role.admin, client_1.Role.super_admin), contents_controller_1.ContentController.deleteContent);
exports.ContentRouter = router;
