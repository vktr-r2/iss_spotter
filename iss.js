const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null); // Call the callback with an error
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const IP = JSON.parse(body);   //Parse the raw data into a JS object
    callback(null, IP);

  });
};

module.exports = { fetchMyIP };