var mongoose = require('mongoose');
var key_model = require('./key-model.js')

mongoose.connect('mongodb://katichphoton:09d6cf2904dc3a19d9342120de49c215674fc426@ds013918.mongolab.com:13918/random-name');

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error: '));
db.once('open', function(){
	var keymodel = mongoose.model('keys',key_model.keySchema);

	var addKey = function(_key){
		var userKey = new keymodel({name: _key});
		userKey.save(function(err, userKey){
			if (err) return console.error(err);
			return userKey;
		});
	};

	var findKey = function(_newKey){
		keymodel.find({name: _newKey, function(err, dbresult){
			if (err) return err;
			if (!dbresult)
				return false;
			return true;
		}});
	};

	var popKey = function(_key){
		keymodel.remove({name: _key}, function(err){
			console.log(err);
			return false;
		});
		return true;
	};

	module.exports.addKey = addKey;
	module.exports.findKey = findKey;
	module.exports.popKey = popKey;
});

