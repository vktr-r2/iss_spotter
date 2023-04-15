const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};



const fetchMyCoords = (JSONstring) => {
    let ip = JSON.parse(JSONstring).ip;
    return request(`https://freegeoip.app/json/${ip}`)
};








  module.exports = { fetchMyIP, fetchMyCoords }