const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./app_api/models/weather');
const Weather = mongoose.model('Weather');


const task = cron.schedule('* * * * *', () => {

   axios.get('https://api.darksky.net/forecast/72b7a195bb6fcb4a8f01cfaf880d0fef/37.8267,-122.4233')
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
            visible: _visible
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

module.exports = task;