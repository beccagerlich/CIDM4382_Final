const express = require('express');
const router = express.Router();
const ctrlWeather = require('../controllers/weather');

router

  .route('/temperature/:place/:howMany/:offset')
  .get(ctrlWeather.temperature);

router
  .route('/windspeed/:place/:howMany/:offset')
  .get(ctrlWeather.windspeed);

// router
//   //based on https://flightaware.com/commercial/flightxml/explorer/#op_FlightInfo
//   .route('/flightinfo/:callsign')
//   .get(ctrlWeather.flightinfo);

module.exports = router;