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
exports.ReviewAndRatingController = void 0;
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const response_1 = __importDefault(require("../../../shared/response"));
const reviewAndRatings_service_1 = require("./reviewAndRatings.service");
const insertReviewAndRating = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewAndRating = req.body;
    const user = req.user;
    if (user)
        reviewAndRating.userId = user.userId;
    const result = yield reviewAndRatings_service_1.ReviewAndRatingService.insertReviewAndRating(reviewAndRating);
    return (0, response_1.default)({ message: "Review And Rating inserted  successfully", result }, res);
}));
const updateReviewAndRating = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const user = req.user;
    if (user)
        data.userId = user.userId;
    const result = yield reviewAndRatings_service_1.ReviewAndRatingService.updateReviewAndRating(id, data);
    return (0, response_1.default)({ message: "Review And Rating updated  successfully", result }, res);
}));
const deleteReviewAndRating = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield reviewAndRatings_service_1.ReviewAndRatingService.deleteReviewAndRating(id);
    return (0, response_1.default)({ message: "ReviewAndRating deleted  successfully", result }, res);
}));
const findOneReviewAndRating = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield reviewAndRatings_service_1.ReviewAndRatingService.findOneReviewAndRating(id);
    return (0, response_1.default)({ message: "ReviewAndRating fetched successfully", result }, res);
}));
const findReviewAndRatings = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reviewAndRatings_service_1.ReviewAndRatingService.findReviewAndRatings();
    return (0, response_1.default)({ message: "ReviewAndRatings retrieved successfully", result }, res);
}));
exports.ReviewAndRatingController = {
    insertReviewAndRating,
    updateReviewAndRating,
    deleteReviewAndRating,
    findOneReviewAndRating,
    findReviewAndRatings,
};
