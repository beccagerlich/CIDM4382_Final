const request = require('request');
const selected_Port = process.env.PORT || '3000'; //line 16
const apiOptions = {
  server: 'http://localhost:' + selected_Port //steel from 
};

const Places = [
  // {
  //   place: "Amarillo",
  //   lattitude: 35.222,
  //   longitude: -101.8313
  // },
  // {
  //   place: "Canyon",
  //   lattitude: 34.9803,
  //   longitude: 101.9188
  // },
  // {
  //   place: "Lubbock",
  //   lattitude: 33.5779,
  //   longitude: 101.8552
  // },
  // {
  //   place: "Oklahoma City",
  //   lattitude: 35.4676,
  //   longitude: 97.5164
  // },
    "Amarillo",
    "Canyon",
    "Lubbock",
    "Oklahoma City",
  ];

// Airports.forEach((airport) => {
//     console.log(airport);
// })

//this will be first selected airport - let coz it can change
//let selectedPlace = "KPHX";

let selectedPlace = "Canyon";
//post method
const weatherSelection = (req, res) => {
  //this helps with the dropdown
    console.log(req.body);
    selectedPlace = req.body.selectedPlace;
    console.log(`Selected Place: ${selectedPlace}`);
    weatherWind(req, res);
    weatherTemp(req, res);
}

const weatherWind = (req, res) => {
    // /arrived/:airport/:howMany/:offset
    console.log(`Selected Place: ${selectedPlace}`);
    const path = `/api/windspeed/${selectedPlace}/15/0`;
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
  console.log(`Selected Place: ${selectedPlace}`);
  const path = `/api/temperature/${selectedPlace}/15/0`;
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
        message = 'No results for this place';
      }
    }
    res.render('windspeeds', 
        {
            places: Places,
            weathers: responseBody,
            message,
            selectedPlace
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
      message = 'No results for this place';
    }
  }
  res.render('temperatures', 
      {
          places: Places,
          weathers: responseBody,
          message,
          selectedPlace
      }
  );
};
//this helps render the page
  module.exports = {
    weatherWind,
    weatherSelection,
    weatherTemp,


  };