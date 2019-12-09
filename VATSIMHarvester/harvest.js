const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/weather');
const Weather = mongoose.model('Weather');


const task = cron.schedule('* /2 * * * *', () => {

   axios.get('https://api.darksky.net/forecast/72b7a195bb6fcb4a8f01cfaf880d0fef/34.9803,101.9188')
    .then( (response) => {

        
        let _time = response.data.currently.time;
        let _temp = response.data.currently.temperature;
        let _humid = response.data.currently.humidity;
        let _wind = response.data.currently.windSpeed;
        let _visible = response.data.currently.visibility;

        var report = {
            time: _time,
            temp: _temp,
            humid: _humid,
            wind: _wind,
            visible: _visible,
            lat: _lat,
            lon: _lon
        }

        const uri = process.env.MONGODB_ATLAS_URL;

        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
                .catch(err => console.log(err));
   
       var promise = Weather.create(report, function (err, small) {
            if (err) return handleError(err);
            // saved!
        });

    })
    .catch( (error) => {
        console.log(error);
    });

    },{
        scheduled: false
    }
);
//MAP
// https://image.maps.api.here.com/mia/1.6/mapview?app_id={YOUR_APP_ID}&app_code={YOUR_APP_CODE}

//TRAFFIC
// const task2 = cron.schedule('* /2 * * * *', () => {

//     axios.get('https://traffic.api.here.com/traffic/6.3/incidents/xml/8/134/86?app_id={ZF9ABGlCsYXVhvhMU5RH}&app_code={hdmllY-4vQcq9j_XYGhDxg}')
//      .then( (response) => {
 
         
//          let _desc = response.data.abbreviation.description;
//          
 
//          var report = {
//              desc: desc,
//        
//          }
 
//          const uri = process.env.MONGODB_ATLAS_URL;
 
//          mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
//                  .catch(err => console.log(err));
    
//         var promise = Weather.create(report, function (err, small) {
//              if (err) return handleError(err);
//              // saved!
//          });
 
//      })
//      .catch( (error) => {
//          console.log(error);
//      });
 
//      },{
//          scheduled: false
//      }
//  );
module.exports = task;