"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = __importDefault(require("../controllers/userController"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var userRoute = function (app) {
    app.post('/users/register', userController_1.default.register);
    app.get('/users/login', userController_1.default.login);
    app.get('/users/auth', jwt_1.default.verfiyToken, userController_1.default.auth);
    app.get('/users', jwt_1.default.verfiyToken, userController_1.default.index);
    app.get('/users/:id', jwt_1.default.verfiyToken, userController_1.default.show);
    app.delete('/users/:id', jwt_1.default.verfiyToken, userController_1.default.remove);
};
exports.default = userRoute;
