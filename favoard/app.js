const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');
const authRouter = require('./routes/auth');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie:{
  httpOnly: true,
  secure: false,
  maxage: 1000 * 60 * 30
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next){
  res.locals.userId = req.session.userId;
  next();
});
app.use((req, res, next) => {
  const method = req.method;
  if(method === 'GET') {
    const csrfToken = crypto.randomBytes(20).toString('hex');
    req.session.csrfToken = csrfToken;
    res.locals = {
      csrfToken: csrfToken,
      csrfField: '<input type="hidden" name="_token" value="'+ csrfToken +'">'
    };
  } else if(['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    if(req.body._token !== req.session.csrfToken) {
      return res.status(419).send('Page Expired');
    }
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/auth/signin');
  }
});

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
