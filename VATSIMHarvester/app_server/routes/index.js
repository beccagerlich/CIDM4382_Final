var express = require('express');
var router = express.Router();
const ctrlWeather = require('../controllers/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather' });
});

/* doing temperatures the client-side (Angular) way */
router.get('/temperatures', ctrlWeather.weatherTemp);
router.post('/temperatures', ctrlWeather.weatherSelection);

/* doing arrivals the server-side (Express and Pug) way */
router.get('/windspeeds', ctrlWeather.weatherWind);
router.post('/windspeeds', ctrlWeather.weatherSelection);

module.exports = router;
