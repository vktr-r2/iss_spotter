const request = require('request');

// nextISSTimesForMyLocation takes callback arg and returns the next flyover times of the ISS for the user's location
const nextISSTimesForMyLocation = function(callback) {

  // Call fetchMyIP to get IP
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    // Call fetchCoordsByIP with IP to get coordinates
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      // Call fetchFlyOvers with coordinates to get flyovers of ISS
      fetchFlyOvers(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        // If successful, return next 5 flyovers to the callback
        callback(null, nextPasses);
      });
    });
  });
};

// fetchMyIP takes callback arg and returns the IP
const fetchMyIP = (callback) => {

  // Make request to ipify API to get IP
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {

      // If error truthy, return it to callback
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      // If status code !== 200 return error and description to callback
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // If successful, extract IP address from body using JSON.parse and return to callback
    const { ip } = JSON.parse(body);
    callback(null, ip);
  });
};

// fetchCoordsByIP takes callback and IP address as params, and returns the latitude and longitude for IP address
const fetchCoordsByIP = (ip, callback) => {

  // Make request to freegeoip API to get latitude and longitude
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      // If error truthy, return error to the callback
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      // If status code !== 200 return error and description to callback
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // If successful, extract latitude and longitude from body using JSON.parse and return to callback
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};


const fetchFlyOvers = (coords, callback) => {

  // Make a request to the ISS flyover API with the given coordinates
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    // If error truthy, return error to the callback
    if (error) {
      callback({error: error}, null);
      return;
    }

    // If status code !== 200 return error and description to callback
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback({error: Error(msg)}, null);
      return;
    }

    // If successful, use JSON.parse to pull flyover times out of data and pass to callback
    const flyOvers = JSON.parse(body);
    callback(null, flyOvers);
  });
};


module.exports = {
  nextISSTimesForMyLocation
};