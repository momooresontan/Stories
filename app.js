const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/authRoute');

const connectDB = require('./db');

//Load config
dotenv.config({ path: 'config.env' });

//Passport config
require('./passport')(passport);

connectDB();

const app = express();

//Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Sessions middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
