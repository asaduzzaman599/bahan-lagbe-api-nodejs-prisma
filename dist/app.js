"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const global_error_1 = __importDefault(require("./app/middlewares/global-error"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: config_1.default.ORIGIN_URL,
    credentials: true
}));
//routes
app.use("/api/v1", routes_1.AppRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: `Server running on port: ${config_1.default.PORT}`,
    });
});
//global error handler
app.use(global_error_1.default);
//api not found handler
app.use(global_error_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'Not Found',
            },
        ],
    });
});
exports.default = app;
