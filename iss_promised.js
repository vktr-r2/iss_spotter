const request = require('request-promise-native');


const fetchMyIP = () => {
  request('https://api.ipify.org?format=json')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    })
  };








  module.exports = { fetchMyIP }