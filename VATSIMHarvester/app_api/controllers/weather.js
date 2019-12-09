const mongoose = require('mongoose');
const Weather = mongoose.model('Weather');
/**
 * Convert from a VATSIm time login value to a JS date
 * @param {string} time_logon 
 */
const vatsimTimeLogonToDate = (time_logon) => {

    //2019 10 23 00 28 13
    // console.log(time_logon);
    let year = parseInt(time_logon.slice(0,4));
    // console.log(`year: ${year}`);
    let month = parseInt(time_logon.slice(4,6));
    // console.log(`month: ${month}`);
    let day = parseInt(time_logon.slice(6,8));
    // console.log(`day: ${day}`);
    let hour = parseInt(time_logon.slice(8,10));
    // console.log(`hour: ${hour}`);
    let minute = parseInt(time_logon.slice(10,12));
    // console.log(`minute: ${minute}`);
    let second = parseInt(time_logon.slice(12,14));
    // console.log(`second: ${second}`);

    //creating a new date in Zulu Time: https://stackoverflow.com/questions/439630/create-a-date-with-a-set-timezone-without-using-a-string-representation
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second, 0));

    return date;

}

/**
 * check to see if the record is within the last day 
 * @param {JS Date} date 
 */
const isOlderThanADay = (date) => {
    //one day in milliseconds
    const day = 1000 * 60 * 60 * 24;

    //grab current time
    let rightnow = Date.now();

    return rightnow - date > day ? true : false;
}

/**
 * PILOT client has departed
 * @param {http request} req 
 * @param {http response} res 
 */
const temperature = (req, res) => {
    console.log(req.params.temperature);
    //this is what info in required
    const temperature = req.params.temperature;
    const offset = parseInt(req.params.offset);
    const howMany = parseInt(req.params.limit);
    Weather.find(
        //https://mongoosejs.com/docs/api.html#model_Model.find
        { //this looks for the airport in the table
            temp: temperature,
        },
        null,
        {
            skip: offset,
            limit: howMany
        },
        //callback
        (err, docs) => {

            let records = [];

            docs.forEach( (document) => { //if it's not older than a day then make the date more readale and then push the info out
                if (!isOlderThanADay(vatsimTimeLogonToDate(document.time_logon))){
                    records.push(document);
                }
            });
            //send records back
            if(!err){
                res.send(records);
            }else{
                res.send(err);
                console.log(err);
            }
        }
    );
}

/**
 * Client has arrived at an airport
 * @param {http request} req 
 * @param {http response} res 
 */
const windspeed = (req, res) => {

    console.log(req.params.windspeed);
    const windspeed = req.params.windspeed;
    const offset = parseInt(req.params.offset);
    const howMany = parseInt(req.params.limit);

    Weather.find(
        {
            wind: windspeed,
        },
        null,
        {
            skip: offset,
            limit: howMany
        },
        //callback
        (err, docs) => {
            let records = [];

            docs.forEach( (document) => {
                if (!isOlderThanADay(vatsimTimeLogonToDate(document.time_logon))){
                    records.push(document);
                }
            });
            //send records back
            if(!err){
                res.send(records);
            }else{
                res.send(err);
                console.log(err);
            }
        }
    );
}

// const flightinfo = (req, res) => {
//     console.log(req.params.callsign);
//     const callsign = req.params.callsign;

//     Weather.find(
//         {
//             callsign: callsign,
//         },
//         //callback
//         (err, docs) => {
//             //send records back
//             if(!err){
//                 res.send(docs);
//             }else{
//                 res.send(err);
//                 console.log(err);
//             }
//         }
//     );    

// }

module.exports = {
  windspeed,
  temperature,
//   flightinfo,
};