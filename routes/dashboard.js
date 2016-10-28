const Router = require('express').Router();




Router.get('/dashboard', (req, res) => {
  res.render('dashboard')


});

module.exports = Router;
