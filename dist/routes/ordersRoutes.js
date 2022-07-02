"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var orderController_1 = __importDefault(require("../controllers/orderController"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var ordersRoute = function (app) {
    app.post('/orders', jwt_1.default.verfiyToken, orderController_1.default.create);
    app.put('/orders/:id', jwt_1.default.verfiyToken, orderController_1.default.update);
    app.delete('/orders/:id', jwt_1.default.verfiyToken, orderController_1.default.remove);
    app.get('/orders', jwt_1.default.verfiyToken, orderController_1.default.index);
    app.get('/orders/:id', jwt_1.default.verfiyToken, orderController_1.default.show);
    app.post('/orders/:id/products', orderController_1.default.addProduct);
};
exports.default = ordersRoute;
