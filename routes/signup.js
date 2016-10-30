'use strict'
const Router = require('express').Router();
const {addEmployee}  = require('../models/employeeDB');





Router.get('/signup', (req, res) => {
  res.render('signup');



});

Router.post('/signup/adduser', addEmployee, (req, res) => {

  res.json({'status':'ok'});



});

module.exports = Router;
