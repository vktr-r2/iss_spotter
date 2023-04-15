const request = require('request');


const fetchMyIP = (callback) => {
  //Call request, pass URL and anon cb function
  request('https://api.ipify.org?format=json', (error, response, body) => {

    //IF request returns error (truthy), pass error and null into cb function (NULL because body wasn't returned)
    if (error) {
      callback(error, null); // Call the callback with an error
      return;
    }

    //IF response was received, and code is not 200 (successful)
    if (response.statusCode !== 200) {
      //Log the code and Message received
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //If function gets this far, that means no errors.  At that point we declare ip object (same as {ip: ip} and JSON.parse finds same object in the body that is returned by request function.  This is called "destructuring")
    const { ip } = JSON.parse(body);
    callback(null, ip);
  });
};

// Function designed to receive ip and callback params
const fetchCoordsByIP = (ip, callback) => {
  //Use template literals to pass IP into URL, request also takes cb func as param
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    //If error truthy from request, and body null, pass error to callback
    if (error) {
      callback(error, null); // Call the callback with an error
      return;
    }

    //If response code from request not 200, handle error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //If we get this far, body has been returned successfully.  Destructure the latitude and longitude variables from the response
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });

  });
};

const fetchFlyOvers = (coords, callback) => {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    //If error truthy from request, and body null, pass error to callback
    if (error) {
      callback(error, null); // Call the callback with an error
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geo location. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const flyOvers = JSON.parse(body);
    callback(null, flyOvers);

  });
};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchFlyOvers };

