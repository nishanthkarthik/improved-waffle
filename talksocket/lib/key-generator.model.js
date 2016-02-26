var mongoose = require('mongoose');

var keySchema = mongoose.Schema({
	name: String,
	token: String
});

module.exports.keySchema = keySchema;