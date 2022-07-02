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
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../../models/users");
var product_1 = require("../../models/product");
var orders_1 = require("../../models/orders");
var dashboard_1 = require("../../models/services/dashboard");
var userStoreTest = new users_1.UserStore();
var productStoreTest = new product_1.ProductStore();
var orderStoreTest = new orders_1.OrderStore();
var DashboardQueriesTest = new dashboard_1.DashboardQueries();
describe('Models Testing', function () {
    describe('User Model', function () {
        it('shoud Register a new user to the appliction', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            firstName: 'mahmoud',
                            lastName: 'bebars',
                            username: 'mbebars',
                            email: 'm.bebars@icloud.com',
                            password: '12345',
                            confirmPassword: '12345',
                        };
                        return [4 /*yield*/, userStoreTest.register(user)];
                    case 1:
                        results = _a.sent();
                        expect(results.userId).toBeDefined();
                        expect(results.username).toEqual('mbebars');
                        expect(results.accessToken).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because email exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            firstName: 'mahmoud',
                            lastName: 'bebars',
                            username: 'mbebar',
                            email: 'm.bebars@icloud.com',
                            password: '12345',
                            confirmPassword: '12345',
                        };
                        return [4 /*yield*/, userStoreTest.register(user)];
                    case 1:
                        results = _a.sent();
                        expect(results.errMsg).toEqual('email exists, choose another one....');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should fail because username exists', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = {
                            firstName: 'mahmoud',
                            lastName: 'bebars',
                            username: 'mbebars',
                            email: 'm.bebars1998@icloud.com',
                            password: '12345',
                            confirmPassword: '12345',
                        };
                        return [4 /*yield*/, userStoreTest.register(user)];
                    case 1:
                        results = _a.sent();
                        expect(results.errMsg).toEqual('username exists, choose another one....');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should login the user to his account', function () { return __awaiter(void 0, void 0, void 0, function () {
            var username, password, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = 'mbebars';
                        password = '12345';
                        return [4 /*yield*/, userStoreTest.login(username, password)];
                    case 1:
                        results = _a.sent();
                        expect(results.accessToken).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return list of users after authorize the request', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userStoreTest.index()];
                    case 1:
                        result = _a.sent();
                        expect(result[0].id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('shoud return the user with id: 1 information', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userStoreTest.show(1)];
                    case 1:
                        result = _a.sent();
                        expect(result.id).toEqual(1);
                        expect(result.username).toEqual('mbebars');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Product Model', function () {
        it('should create a product row in database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            name: 'macbookPro',
                            price: 1000,
                        };
                        return [4 /*yield*/, productStoreTest.create(product)];
                    case 1:
                        results = _a.sent();
                        expect(results.productId).toBeDefined();
                        expect(results.name).toEqual('macbookPro');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retive a products list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStoreTest.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retive a product with id:1 information', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStoreTest.show(1)];
                    case 1:
                        result = _a.sent();
                        expect(result.id).toEqual(1);
                        expect(result.name).toEqual('macbookPro');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retive a products list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStoreTest.index()];
                    case 1:
                        result = _a.sent();
                        expect(result[0].id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update a product price with id:1 ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            name: 'macbookPro',
                            price: 1200,
                        };
                        return [4 /*yield*/, productStoreTest.update(1, product)];
                    case 1:
                        results = _a.sent();
                        expect(+results.price).toEqual(1200);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Orders Model', function () {
        it('should create a order row in database', function () { return __awaiter(void 0, void 0, void 0, function () {
            var order, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = {
                            userId: 1,
                            productId: 1,
                            quantity: 3,
                            status: 'active',
                        };
                        return [4 /*yield*/, orderStoreTest.create(order)];
                    case 1:
                        results = _a.sent();
                        expect(results.orderId).toBeDefined();
                        expect(results.quantity).toEqual(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retive a orders list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStoreTest.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retive a order with id:1 information', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStoreTest.show(1)];
                    case 1:
                        result = _a.sent();
                        expect(result.id).toEqual(1);
                        expect(result.quantity).toBe(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retive a orders list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStoreTest.index()];
                    case 1:
                        result = _a.sent();
                        expect(result[0].id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update a order with id:1 quantity to be 5 ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            quantity: 5,
                            status: 'active',
                        };
                        return [4 /*yield*/, orderStoreTest.update(1, product)];
                    case 1:
                        results = _a.sent();
                        expect(+results.quantity).toEqual(5);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update a order status  with id:1  to be completed', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            quantity: 5,
                            status: 'completed',
                        };
                        return [4 /*yield*/, orderStoreTest.update(1, product)];
                    case 1:
                        results = _a.sent();
                        expect(results.status).toEqual('completed');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Dashboard controller', function () {
        it('should return most expensive products', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product1, product2, product3, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product1 = {
                            name: 'macbookPro',
                            price: 1500,
                        };
                        product2 = {
                            name: 'macbookPro',
                            price: 1300,
                        };
                        product3 = {
                            name: 'macbookPro',
                            price: 1200,
                        };
                        return [4 /*yield*/, productStoreTest.create(product1)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, productStoreTest.create(product2)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, productStoreTest.create(product3)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, DashboardQueriesTest.expinsiveProducts()];
                    case 4:
                        results = _a.sent();
                        expect(results.length).toEqual(4);
                        expect(results[0].price).toEqual(1500);
                        expect(results[3].price).toEqual(1200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should get Order with id: 1 object list after authorization', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DashboardQueriesTest.usersOrders(1)];
                    case 1:
                        results = _a.sent();
                        expect(results[0].id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Returning to Orders Model', function () {
        it('should remove order row with id:1 ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderStoreTest.delete(1)];
                    case 1:
                        results = _a.sent();
                        expect(results.id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Returning to Product Model', function () {
        it('should remove a product row with id:1 ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productStoreTest.delete(1)];
                    case 1:
                        results = _a.sent();
                        expect(results.id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Returning to Users Model', function () {
        it('should remove user with id:1 ', function () { return __awaiter(void 0, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userStoreTest.delete(2)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, userStoreTest.delete(3)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, userStoreTest.delete(4)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, userStoreTest.delete(1)];
                    case 4:
                        results = _a.sent();
                        expect(results.id).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
