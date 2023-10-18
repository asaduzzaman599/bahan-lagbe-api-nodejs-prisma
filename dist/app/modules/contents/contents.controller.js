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
exports.ContentController = void 0;
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const response_1 = __importDefault(require("../../../shared/response"));
const contents_service_1 = require("./contents.service");
const insertContent = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body;
    const result = yield contents_service_1.ContentService.insertContent(content);
    return (0, response_1.default)({ message: "Content inserted  successfully", result }, res);
}));
const updateContent = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield contents_service_1.ContentService.updateContent(id, data);
    return (0, response_1.default)({ message: "Content updated  successfully", result }, res);
}));
const deleteContent = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield contents_service_1.ContentService.deleteContent(id);
    return (0, response_1.default)({ message: "Content deleted  successfully", result }, res);
}));
const findOneContent = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield contents_service_1.ContentService.findOneContent(id);
    return (0, response_1.default)({ message: "Content fetched successfully", result }, res);
}));
const findContents = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contents_service_1.ContentService.findContents();
    return (0, response_1.default)({ message: "Contents retrieved successfully", result }, res);
}));
exports.ContentController = {
    insertContent,
    updateContent,
    deleteContent,
    findOneContent,
    findContents,
};
