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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
var jwt_1 = __importDefault(require("../utils/jwt"));
var uuid_1 = require("uuid");
dotenv_1.default.config();
var saltRounds = process.env.SALT_ROUNDS;
var pepper = process.env.BCRYPT_PASSWORD;
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    // GET All users in a list
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, results, users, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        results = _a.sent();
                        users = results.rows;
                        conn.release();
                        return [2 /*return*/, users];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Cannot get users ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not find user with id: ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // user Register function
    UserStore.prototype.register = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, checkEmailSql, emailCheck, checkUsernameSql, usernameCheck, hash, userId, insertSql, result, user, accessToken, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()
                            // check if email exist in the database or no to prevent duplication
                        ];
                    case 1:
                        conn = _a.sent();
                        checkEmailSql = 'SELECT * FROM users WHERE email =($1)';
                        return [4 /*yield*/, conn.query(checkEmailSql, [u.email])];
                    case 2:
                        emailCheck = _a.sent();
                        if (emailCheck.rows.length >= 1)
                            return [2 /*return*/, {
                                    username: '',
                                    userId: '',
                                    accessToken: '',
                                    errMsg: 'email exists, choose another one....',
                                }
                                // Since login contain username so it Can not be also duplicated in db so...
                                // we check if emal exist in the database or no
                            ];
                        checkUsernameSql = 'SELECT * FROM users WHERE username =($1)';
                        return [4 /*yield*/, conn.query(checkUsernameSql, [u.username])];
                    case 3:
                        usernameCheck = _a.sent();
                        if (usernameCheck.rows.length >= 1)
                            return [2 /*return*/, {
                                    username: '',
                                    userId: '',
                                    accessToken: '',
                                    errMsg: 'username exists, choose another one....',
                                }
                                // compare passwords & create hashed password
                            ];
                        // compare passwords & create hashed password
                        if (u.password !== u.confirmPassword)
                            return [2 /*return*/, {
                                    username: '',
                                    userId: '',
                                    accessToken: '',
                                    errMsg: 'Passwords Doesn not Match, try Again...',
                                }];
                        hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                        userId = (0, uuid_1.v4)();
                        insertSql = 'INSERT INTO users (userid,firstName,lastName,username,email,password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
                        return [4 /*yield*/, conn.query(insertSql, [
                                userId,
                                u.firstName,
                                u.lastName,
                                u.username,
                                u.email,
                                hash,
                            ])];
                    case 4:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        accessToken = jwt_1.default.generateToken(user.username, user.userId);
                        response = {
                            userId: user.userid,
                            username: user.username,
                            accessToken: accessToken,
                        };
                        return [2 /*return*/, response];
                    case 5:
                        err_3 = _a.sent();
                        // catch any Errors
                        throw new Error("Could not Register the user with name ".concat(u.username, ". Error: ").concat(err_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // user Login function
    UserStore.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, user, accessToken, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()
                            // check username exists or no
                        ];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE username=($1)';
                        return [4 /*yield*/, conn.query(sql, [username])
                            // check of username existance
                        ];
                    case 2:
                        result = _a.sent();
                        // check of username existance
                        if (result.rows.length) {
                            user = result.rows[0];
                            // compare password with hashed one in the db
                            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                                accessToken = jwt_1.default.generateToken(user.username, user.userid);
                                response = {
                                    username: username,
                                    userId: user.userid,
                                    accessToken: accessToken,
                                };
                                return [2 /*return*/, response];
                            }
                        }
                        // return errors when username/password is not correct
                        return [2 /*return*/, {
                                username: '',
                                userId: '',
                                accessToken: '',
                                errMsg: 'username/password is not correct... try again',
                            }];
                    case 3:
                        err_4 = _a.sent();
                        // catch any Errors
                        return [2 /*return*/, {
                                username: '',
                                userId: '',
                                accessToken: '',
                                errMsg: "Could not Login user to the account due to Error: ".concat(err_4),
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, product, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        product = result.rows[0];
                        conn.release();
                        return [2 /*return*/, product];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not delete user with id: ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
