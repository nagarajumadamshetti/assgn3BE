const createError = require('http-errors');
const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
// const exjwt = require('express-jwt');
const indexRouter = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(cors());
// app.use(bodyParser({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());

// app.use(cookieParser());



app.use('/', indexRouter);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//   next();
// });


// const jwtMW = exjwt({
//   secret: 'keyboard cat 4 ever'
// });


//catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use((err, req, res, next) => {
  res.status(404).json({
    sucess: false,
     error:err
  });
  console.log(err)
  //   // next(err);
});
app.listen(PORT, () => {
  console.log(`server Started at ${PORT}`);
});

module.exports = app;