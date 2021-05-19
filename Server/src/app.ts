import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from "cors";
import formidable from "formidable";
import bodyParser from "body-parser";
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import signupRouter from './routes/signup';
import loginRouter from './routes/login';
import allRoomsRouter from './routes/getallrooms';
import listRoomRouter from './routes/listroom';
import admin from './routes/admin';
import updateListingRouter from './routes/updatelisting';
import deleteRoomRouter from './routes/deleteroom';
import allHostRouter from './routes/allHost';
import allGuests from './routes/allGuests';
import uploadImage from './routes/uploadImage';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', "true");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization header');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "100mb", parameterLimit: 500000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/upload', uploadImage);
app.use('/users', usersRouter);
app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);
app.use('/api/rooms', allRoomsRouter);
app.use('/api/host/listing', listRoomRouter);
app.use('/api/admin/users', admin);
app.use('/api/update/id', updateListingRouter);
app.use('/api/delete/id', deleteRoomRouter);
app.use('/api/getAllHosts', allHostRouter);
app.use('/api/allGuests', allGuests);


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
