const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};


const fetchMyCoords = (JSONipString) => {
    const ip = JSON.parse(JSONipString).ip;
    return request(`https://freegeoip.app/json/${ip}`)
};


const fetchFlyOvers = (JSONcoordsString) => {
  const latitude = JSON.parse(JSONcoordsString).latitude
  const longitude = JSON.parse(JSONcoordsString).longitude
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}


const nextISSFlyOver = () => {
  fetchMyIP()
  .then(fetchMyCoords)
  .then(fetchFlyOvers)
  .then((data) => {
    const { response } = JSON.parse(data);
    console.log(response);
})
}


const printPassTimes = function(passTimes) {
  // If response data received (truthy)
  if (passTimes.response) {
    // Assign the array of data to 'passes' variable
    const passes = passTimes.response;
    // Loop through each pass in array.
    for (const pass of passes) {
      // Create new Date object set to the Unix timestamp of the passOver time.
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      // Assign the duration of passOver to a variable.
      const duration = pass.duration;
      // Print the details of the passOver to the console.
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  } else {
    // If there was an error, print it to the console.
    console.log("Error:", passTimes.error);
  }
};

  module.exports = { nextISSFlyOver, printPassTimes }