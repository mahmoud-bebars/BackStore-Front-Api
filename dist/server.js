"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
var productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
var dashboardRoutes_1 = __importDefault(require("./routes/services/dashboardRoutes"));
var ordersRoutes_1 = __importDefault(require("./routes/ordersRoutes"));
var app = (0, express_1.default)();
var address = '0.0.0.0:5000';
// Dotenv config
dotenv_1.default.config();
var _a = process.env, PORT = _a.PORT, ENV = _a.ENV;
// CORS configration options
var corsOptions = {
    origin: '*',
    optionsSucessStatus: 200,
};
// CORS middleware
app.use((0, cors_1.default)(corsOptions));
// HTTP request logger middleware
app.use((0, morgan_1.default)('dev'));
//Json Body Parser middleware
app.use(express_1.default.json());
console.log("Working on The ".concat(ENV === 'dev' ? '💿' : '🧪', " ").concat(ENV === 'dev' ? 'Development' : 'Testing', " Databse Environment"));
(0, usersRoutes_1.default)(app);
(0, productsRoutes_1.default)(app);
(0, ordersRoutes_1.default)(app);
(0, dashboardRoutes_1.default)(app);
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server is Up & running on Port:".concat(PORT, " at: ").concat(address));
});
exports.default = app;
