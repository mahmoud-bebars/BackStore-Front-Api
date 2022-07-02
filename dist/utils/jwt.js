"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var jwtSecret = process.env.ACCESS_TOKEN_SEECRET;
var jwtExpire = process.env.JWT_EXPIRES;
var generateToken = function (username, userId) {
    var accessToken = jsonwebtoken_1.default.sign({
        user: username,
        userId: userId,
    }, jwtSecret, { expiresIn: jwtExpire });
    return accessToken;
};
var verfiyToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, jwtSecret);
        // console.log('Authorized') /* just for dev testing */
        next();
    }
    catch (err) {
        return res.status(401).json("invaild token ".concat(err));
    }
};
exports.default = {
    generateToken: generateToken,
    verfiyToken: verfiyToken,
};
