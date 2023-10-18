"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRouter = void 0;
const express_1 = __importDefault(require("express"));
const reviewAndRatings_controller_1 = require("./reviewAndRatings.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const reviewAndRatings_validation_1 = require("./reviewAndRatings.validation");
const validate_request_1 = __importDefault(require("../../middlewares/validate-request"));
const router = express_1.default.Router();
router.route('/create-review-rating').post((0, validate_request_1.default)(reviewAndRatings_validation_1.ReviewAndRatingValidation.createReviewAndRatingZodSchema), (0, auth_1.default)(client_1.Role.customer), reviewAndRatings_controller_1.ReviewAndRatingController.insertReviewAndRating);
router.route('/')
    .get(reviewAndRatings_controller_1.ReviewAndRatingController.findReviewAndRatings);
router.route('/:id')
    .get(reviewAndRatings_controller_1.ReviewAndRatingController.findOneReviewAndRating)
    .patch((0, validate_request_1.default)(reviewAndRatings_validation_1.ReviewAndRatingValidation.updateReviewAndRatingZodSchema), (0, auth_1.default)(client_1.Role.customer), reviewAndRatings_controller_1.ReviewAndRatingController.updateReviewAndRating)
    .delete((0, auth_1.default)(client_1.Role.customer), reviewAndRatings_controller_1.ReviewAndRatingController.deleteReviewAndRating);
exports.ReviewAndRatingRouter = router;
