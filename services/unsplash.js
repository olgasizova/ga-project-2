// const fetch = require('node-fetch');

// const API_URL = 'https://api.unsplash.com/photos/random/?';
// const API_KEY = process.env.UNSPLASH_KEY;
//




// function unsplashImages(req, res, next) {
//   console.log(`${API_URL}client_id=${API_KEY}`);
//   fetch(`${API_URL}client_id=${API_KEY}`)
//   .then(r => r.json())
//   .then((result) => {
//     res.backgroundImage = result;

//     next();
//   })
//   .catch((err) => {
//     res.err = err;
//     next();
//   });
// }

// module.exports = { unsplashImages };
