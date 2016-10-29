const Router = require('express').Router();
const { unsplashImages } = require('../services/unsplash');




Router.get('/login', unsplashImages, (req, res) => {
  res.render('index', {
    image: res.backgroundImage.urls,

  });


});

module.exports = Router;
