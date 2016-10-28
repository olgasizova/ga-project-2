const fetch = require('node-fetch');

const API_URL = "http://www.yaddress.net/api/address?AddressLine1=504";

function validateAddress(req, res, next){
  console.log(`${API_URL}`);
  fetch(`${API_URL}`)
  .then(r => r.json())
  .then((result) => {
    res.fetchData = result;

    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  })

}

module.exports = { validateAddress }
