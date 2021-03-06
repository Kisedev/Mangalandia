var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testsRouter = require('./routes/tests');
var wikiRouter = require('./routes/wiki');
var catalogoRouter = require('./routes/catalogo');

var app = express();

var mongoose = require('mongoose');
const mongoDB = "mongodb+srv://mangadmin:mangasword@kisesp-ui1cx.gcp.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
// seta o path dos templates (views) e a engine pug 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// adiciona os middlewares e os arquivos estaticos html para uso nos requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// finalmente indica os modulos de rotas dos requests
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testsRouter);
app.use('/wiki', wikiRouter);
app.use('/catalogo', catalogoRouter);

// trata erros 404 e 5xx
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
