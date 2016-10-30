'use strict'
const app = require('../app');
const Router = require('express').Router();
const {addEmployee}  = require('../models/employeeDB');
const bodyParser = require('body-parser');


Router.use(bodyParser.json()); // for parsing application/json
Router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded





Router.get('/signup', (req, res) => {
  res.render('signup');



});

Router.post('/signup/adduser', addEmployee,(req, res) => {

  console.log(req.body);
  if (res.error){
    console.log("error response user exists");
    console.log(res.error);
    res.status(500).send(res.error);
  }
  else {
    console.log('success response new user added');
    console.log(res.newEmployee);
    res.json(res.newEmployee);
  }



});

module.exports = Router;
