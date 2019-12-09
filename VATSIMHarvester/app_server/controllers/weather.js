const request = require('request');
const selected_Port = process.env.PORT || '3000'; //line 16
const apiOptions = {
  server: 'http://localhost:' + selected_Port //steel from 
};

const Airports = [
    //BRAVO
    "KPHX", //KPHX - Phoenix Sky Harbor Intl
    //CHARLIE
    "KABQ", //KABQ - Albuquerque Intl Sunport
    "KAMA", //KAMA - Rick Husband Amarillo Intl
    "KDMA", //KDMA - Davis Monthan AFB
    "KELP", //KELP - El Paso Intl
    "KTUS", //KTUS - Tucson Intl & U90 TRACON
    //DELTA
    "KAEG", //KAEG - Double Eagle II
    "KBIF", //KBIF - Biggs AAF
    "KCHD", //KCHD - Chandler Municipal
    "KCVS", //KCVS - Cannon AFB
    "KDVT", //KDVT - Phoenix Deer Valley
    "KFFZ", //KFFZ - Falcon Field
    "KFHU", //KFHU - Sierra Vista / Libby AAF
    "KFLG", //KFLG - Flagstaff Pulliam
    "KGEU", //KGEU - Glendale Municipal
    "KGYR", //KGYR - Phoenix Goodyear
    "KHMN", //KHMN - Holloman AFB
    "KIWA", //KIWA - Phoenix-Mesa Gateway
    "KLUF", //KLUF - Luke AFB
    "KPRC", //KPRC - Ernest A Love Field
    "KROW", //KROW - Roswell Intl Air Center
    "KRYN", //KRYN - Ryan Field
    "KSAF", //KSAF - Santa Fe Municipal
    "KSDL"  //KSDL - Scottsdale
  ];

// Airports.forEach((airport) => {
//     console.log(airport);
// })

//this will be first selected airport - let coz it can change
//let selectedAirport = "KPHX";

let selectedAirport = "KPHX";
//post method
const weatherSelection = (req, res) => {
  //this helps with the dropdown
    console.log(req.body);
    selectedAirport = req.body.selectedAirport;
    console.log(`Selected Airport: ${selectedAirport}`);
    weatherWind(req, res);
    weatherTemp(req, res);
}

const weatherWind = (req, res) => {
    // /arrived/:airport/:howMany/:offset
    console.log(`Selected Airport: ${selectedAirport}`);
    const path = `/api/windspeed/${selectedAirport}/15/0`;
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        let data = []; //this checks if the request was successfull and that there are records passed here
        if (statusCode === 200 && body.length) {//this checks that the page responded well (200) and the there is anything in the body
            data = body;
        }//this passes the info into the page
        renderArrivalsPage(req, res, data);
      }
    );
};
const weatherTemp = (req, res) => {
  // /arrived/:airport/:howMany/:offset
  console.log(`Selected Airport: ${selectedAirport}`);
  const path = `/api/temperature/${selectedAirport}/15/0`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      let data = []; //this checks if the request was successfull and that there are records passed here
      if (statusCode === 200 && body.length) {//this checks that the page responded well (200) and the there is anything in the body
          data = body;
      }//this passes the info into the page
      renderTempPage(req, res, data);
    }
  );
};
const renderArrivalsPage = (req, res, responseBody) => {
    let message = null;
    //is the response an array ?
    if (!(responseBody instanceof Array)) {
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No results for this airport';
      }
    }
    res.render('windspeeds', 
        {
            airports: Airports,
            weathers: responseBody,
            message,
            selectedAirport
        }
    );
};
const renderTempPage = (req, res, responseBody) => {
  let message = null;
  //is the response an array ?
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No results for this airport';
    }
  }
  res.render('temperatures', 
      {
          airports: Airports,
          weathers: responseBody,
          message,
          selectedAirport
      }
  );
};
//this helps render the page
  module.exports = {
    weatherWind,
    weatherSelection,
    weatherTemp,


  };