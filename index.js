const { nextISSTimesForMyLocation } = require('./iss');

// printPassTimes prints ISS flyOver data
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

// Call nextISSTimesForMyLocation function and pass in a callback function that handles the result.
nextISSTimesForMyLocation((error, passTimes) => {
  // If erro truthy, print error to the console and exit.
  if (error) {
    return console.log("It didn't work!", error);
  }
  // If no error, call printPassTimes with the passTimes data.
  printPassTimes(passTimes);
});