"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dashboardController_1 = __importDefault(require("../../controllers/service/dashboardController"));
var jwt_1 = __importDefault(require("../../utils/jwt"));
var dashboardRoutes = function (app) {
    app.get('/expinsiveProducts', dashboardController_1.default.expinsiveProducts);
    app.get('/usersOrders/:id', jwt_1.default.verfiyToken, dashboardController_1.default.usersOrder);
};
exports.default = dashboardRoutes;
