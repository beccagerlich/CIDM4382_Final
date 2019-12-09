const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const weatherSchema = new Schema({
    time: String,
	temp: String,
	humid: String,
	wind: String,
	visible: String,
	lat: String,
	lon: String
});

mongoose.model('Weather', weatherSchema);

