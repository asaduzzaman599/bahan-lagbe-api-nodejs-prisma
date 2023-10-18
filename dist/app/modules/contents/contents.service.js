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
exports.ContentService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_client_1 = __importDefault(require("../../../shared/prisma-client"));
const api_error_1 = __importDefault(require("../../../errors/api-error"));
const insertContent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const contentExist = yield prisma_client_1.default.content.findFirst({
        where: {
            title: { equals: payload.title }
        }
    });
    if (contentExist)
        throw new api_error_1.default(http_status_1.default.CONFLICT, 'Content already exist!');
    const createdContent = yield prisma_client_1.default.content.create({
        data: payload
    });
    return createdContent;
});
const updateContent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const contentExist = yield prisma_client_1.default.content.findUnique({
        where: {
            id
        }
    });
    if (!contentExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'Content not exists');
    const content = yield prisma_client_1.default.content.update({
        where: {
            id
        },
        data: payload
    });
    return content;
});
const deleteContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentExist = yield prisma_client_1.default.content.findUnique({
        where: {
            id
        },
    });
    if (!contentExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'Content not exists');
    const content = yield prisma_client_1.default.content.delete({
        where: {
            id
        }
    });
    return contentExist;
});
const findOneContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contentExist = yield prisma_client_1.default.content.findUnique({
        where: {
            id
        },
    });
    if (!contentExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, 'Content not exists');
    return contentExist;
});
const findContents = () => __awaiter(void 0, void 0, void 0, function* () {
    const contents = yield prisma_client_1.default.content.findMany({});
    return contents;
});
exports.ContentService = {
    insertContent,
    updateContent,
    deleteContent,
    findOneContent,
    findContents
};
