var mongoose = require('mongoose');
var key_model = require('./key-generator/model.js')

var util = require('util');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
//db.once('open', function() {
var keymodel = mongoose.model('keys', key_model.keySchema);

var addKey = function(_key) {
	var userKey = new keymodel({
		name: _key
	});
	userKey.save(function(err, userKey) {
		if (err) return console.error(err);
		return userKey;
	});
};

var findKey = function(_newKey, callback) {
	var _keymodel = mongoose.model('keys', key_model.keySchema);
	_keymodel.count({
		name: _newKey
	}, function(err, dbresult) {
		if (err) 
			callback(err, false);
		if (dbresult > 0)
			callback(err, true);
		else
			callback(err, false);
	});
};

var popKey = function(_key) {
	keymodel.remove({
		name: _key
	}, function(err) {
		console.log(err);
		return false;
	});
	return true;
};

module.exports.keymodel = keymodel;
module.exports.addKey = addKey;
module.exports.findKey = findKey;
module.exports.popKey = popKey;
//});