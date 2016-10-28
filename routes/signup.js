const Router = require('express').Router();




Router.get('/signup', (req, res) => {
  res.render('signup')


});

module.exports = Router;
