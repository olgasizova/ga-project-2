/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const express       = require('express');
const logger        = require('morgan');
const bodyParser = require('body-parser');

const loginRoute    = require('./routes/login');
const signupRoute   = require('./routes/signup');
const profileRoute   = require('./routes/profile');
const dashboardRoute   = require('./routes/dashboard');
const addressRoute   = require('./routes/address');

const Router = require('express').Router();

const app           = express();
const PORT          = process.argv[2] || process.env.PORT || 3000;

app.use(logger('dev'));


app.set('view engine', 'ejs');
app.set('views', 'views');



app.use(express.static('public'));
app.use('/', loginRoute);
app.use('/', signupRoute);
app.use('/', profileRoute);
app.use('/', dashboardRoute);
app.use('/', addressRoute);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json credit: http://stackoverflow.com/questions/9177049/express-js-req-body-undefined
app.use(bodyParser.json());

app.listen(PORT, () => console.warn('Onboard server is listening on ', PORT));

module.exports = app;




