'use strict'
const app = require('../app');
const Router = require('express').Router();
const http = require('http');
const url  = require('url');

const {validateAddress } = require('../services/address');

const {findAddress}  = require('../models/addressDB');
const {updateAddress}  = require('../models/addressDB');

const bodyParser = require('body-parser');
Router.use(bodyParser.json()); // for parsing application/json
Router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



Router.get('/address/get', findAddress, (req, res) => {
    console.log(req.param);
    if (res.error){
      console.log("error response getting address");
      console.log(res.error);
      res.status(500).send(res.error);
    }else {
      console.log('success response getting address');
      console.log(res.foundAddress);
      res.json(res.foundAddress);
    }

});

Router.post('/address/save', updateAddress, (req, res) => {
  console.log(req.body);
  if (res.error){
    console.log("error response getting address");
    console.log(res.error);
    res.status(500).send(res.error);
  }
  else {
    console.log('success response getting address');
    console.log(res.updAddress);
    res.json(res.updAddress);
  }

});

Router.post('/address/validate', validateAddress, (req, res) => {
  console.log(req.body);
  if (res.error){
    console.log("error response getting address");
    console.log(res.error);
    res.status(500).send(res.error);
  }
  else {
    console.log('success response getting address');
    console.log(res.fetchData);
    res.json(res.fetchData);
  }

});


module.exports = Router;
