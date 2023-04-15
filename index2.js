const { fetchMyIP , fetchMyCoords } = require('./iss_promised');


fetchMyIP()
.then(fetchMyCoords)
.then(body => console.log(body))