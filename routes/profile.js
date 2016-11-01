'use strict'
const app = require('../app');
const Router = require('express').Router();


const {updateEmployee}  = require('../models/employeeDB');

const bodyParser = require('body-parser');


Router.use(bodyParser.json()); // for parsing application/json
Router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// Router.get('/profile', validateAddress, (req, res) => {
//   res.render('profile', {
//     validAddress: res.fetchData
//   });


// });


Router.post('/profile/update', updateEmployee,(req, res) => {

  console.log(req.body);
  if (res.error){
    console.log("error response updating employee");
    console.log(res.error);
    res.status(500).send(res.error);
  }
  else {
    console.log('success response updating employee');
    console.log(res.updEmployee);
    res.json(res.updEmployee);
  }



});


module.exports = Router;
