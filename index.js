const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
  
  fetchCoordsByIP(ip, (error, latLong) => {
    if (error) {
      console.log("Error fetching IP coordinates: ", error);
      return;
    }
    console.log('It worked! Returned coordinates:', latLong);
  });
});