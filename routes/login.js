const Router = require('express').Router();
// const { unsplashImages } = require('../services/unsplash');




Router.get('/login', (req, res) => {
  res.render('index', {
    // image: res.backgroundImage.urls,

  });


});

module.exports = Router;


// unsplashImages,
