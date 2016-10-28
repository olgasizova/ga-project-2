const Router = require('express').Router();

const { validateAddress } = require('../services/address');




Router.get('/profile', validateAddress, (req, res) => {
  res.render('profile', {
    validAddress: res.fetchData
  });


});

module.exports = Router;
