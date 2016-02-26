var mongoose = require('mongoose');

var keySchema = mongoose.Schema({
	name: String
});

module.exports.keySchema = keySchema;