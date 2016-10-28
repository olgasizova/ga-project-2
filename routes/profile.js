const Router = require('express').Router();




Router.get('/profile', (req, res) => {
  res.render('profile')


});

module.exports = Router;
