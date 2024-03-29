var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productosRouter = require('./routes/productos');
var crearPedidoRouter = require('./routes/crearPedido');
var pedidosRouter = require('./routes/pedidos');
var clientesRouter = require('./routes/clientes');
var analiticaRouter = require('./routes/analitica');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/crearPedido', crearPedidoRouter);
app.use('/pedidos', pedidosRouter);
app.use('/clientes', clientesRouter);
app.use('/analitica', analiticaRouter);

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
