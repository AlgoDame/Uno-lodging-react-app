"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const getallrooms_1 = __importDefault(require("./routes/getallrooms"));
const listroom_1 = __importDefault(require("./routes/listroom"));
const admin_1 = __importDefault(require("./routes/admin"));
const updatelisting_1 = __importDefault(require("./routes/updatelisting"));
const deleteroom_1 = __importDefault(require("./routes/deleteroom"));
const allHost_1 = __importDefault(require("./routes/allHost"));
const allGuests_1 = __importDefault(require("./routes/allGuests"));
const roomBooking_1 = __importDefault(require("./routes/roomBooking"));
const app = express_1.default();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization header');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: "100mb", parameterLimit: 500000 }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/users', users_1.default);
app.use('/api/signup', signup_1.default);
app.use('/api/login', login_1.default);
app.use('/api/rooms', getallrooms_1.default);
app.use('/api/host/listing', listroom_1.default);
app.use('/api/admin/users', admin_1.default);
app.use('/api/update', updatelisting_1.default);
app.use('/api/delete/id', deleteroom_1.default);
app.use('/api/getAllHosts', allHost_1.default);
app.use('/api/allGuests', allGuests_1.default);
app.use('/api/bookings', roomBooking_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
