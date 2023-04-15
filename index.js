const { fetchMyIP, fetchCoordsByIP, fetchFlyOvers } = require('./iss');

//fetchMyIP gets IP or error from request
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);

  //If IP fetch was successful, passed to fetchCoordsByIP
  fetchCoordsByIP(ip, (error, latLong) => {
    if (error) {
      console.log("Error fetching IP coordinates: ", error);
      return;
    }
    console.log('It worked! Returned coordinates:', latLong);

    fetchFlyOvers(latLong, (error, flyOvers) => {
      if (error) {
        console.log("Error fetching flyovers: ", error);
        return;
      }
      console.log('It worked! Returned coordinates:', flyOvers);

    });
  });
});