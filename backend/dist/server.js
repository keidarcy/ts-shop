"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
db_1.default();
const app = express_1.default();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(express_1.default.json());
app.use('/api/products', productRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(path_1.default.resolve(), 'frontend', 'build', 'index.html')));
}
app.use('/upload', express_1.default.static(path_1.default.join(path_1.default.resolve(), '/uploads')));
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
//# sourceMappingURL=server.js.map