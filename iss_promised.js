const request = require('request-promise-native');



request('https://api.ipify.org?format=json')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error)
  })