const fetch = require('node-fetch');
// public API to validate addresses
// to make Y address API work, we need to attach a query string with 
// ?AddressLine1= &AddressLine2=
const API_URL = 'http://www.yaddress.net/api/address';

// validateAddress function
function validateAddress(req, res, next){
// split original url into two parts and get the second part  
  let queryAddress = req.url.split('?')[1];
  console.log('queryAddress: ' + queryAddress);
// connect query string to API_URL 
  let apiGetAddress = `${API_URL}` + '?' + queryAddress;
  console.log('apiGetAddress: ' + apiGetAddress);
  
  fetch(apiGetAddress)
    .then(r => r.json())
    .then((result) => {
      res.fetchData = result;

      next();
    })
    .catch((err) => {
      res.error = err;
      next();
    })
    return false;
  }


module.exports = { validateAddress }
