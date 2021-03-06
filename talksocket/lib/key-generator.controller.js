var mongoose = require('mongoose');
var key_model = require('./key-generator.model.js')
var crypto = require('crypto-extra')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
//db.once('open', function() {
var keymodel = mongoose.model('keys', key_model.keySchema);

var addKey = function(_key) {
	var userKey = new keymodel({
		name: _key,
		token: crypto.random()
	});
	userKey.save(function(err, userKey) {
		if (err) return console.error(err);
		return userKey;
	});
};

function findKey(_newKey, callback) {
	var _keymodel = mongoose.model('keys', key_model.keySchema);
	_keymodel.find({
		name: _newKey
	}, function(err, dbresult) {
		if (err)
			callback(err, false, {});
		if (dbresult.length > 0)
			callback(false, true, dbresult);
		else
			callback(false, false, dbresult);
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