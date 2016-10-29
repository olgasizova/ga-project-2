const Router = require('express').Router();




Router.get('/signup', (req, res) => {
  res.render('signup');



});

Router.post('/signup/adduser', (req, res) => {
  res.json({'status':'ok'});



});

module.exports = Router;
