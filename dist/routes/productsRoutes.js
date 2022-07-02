"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var productController_1 = __importDefault(require("../controllers/productController"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var productsRoute = function (app) {
    app.post('/products', jwt_1.default.verfiyToken, productController_1.default.create);
    app.put('/products/:id', jwt_1.default.verfiyToken, productController_1.default.update);
    app.delete('/products/:id', jwt_1.default.verfiyToken, productController_1.default.remove);
    app.get('/products', productController_1.default.index);
    app.get('/products/:id', productController_1.default.show);
};
exports.default = productsRoute;
