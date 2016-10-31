'use strict'
const app = require('../app');
const Router = require('express').Router();

const {findEmployee}  = require('../models/employeeDB');

const bodyParser = require('body-parser');
Router.use(bodyParser.json()); // for parsing application/json
Router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded






Router.get('/dashboard', (req, res) => {
  res.render('dashboard')
});

Router.post('/dashboard/get', findEmployee, (req, res) => {
  console.log(req.body);
  if (res.error){
    console.log("error response getting employee");
    console.log(res.error);
    res.status(500).send(res.error);
  }
  else {
    console.log('success response getting employee');
    console.log(res.findEmployee);
    res.json(res.findEmployee);
  }

});


module.exports = Router;
