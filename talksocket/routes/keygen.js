var express = require('express');
var router = express.Router();
var sillyname = require('sillyname');
var key_generator = require('../lib/key-generator.controller.js');

router.get('/', function(req, res) {
	var newKey = sillyname().replace(/\s/g, "-").toLowerCase();
	newKey += '-' + Math.floor(100 + Math.random() * 900);

	key_generator.findKey(newKey, function(err, dbresult) {
		if (dbresult == 0) {
			key_generator.addKey(newKey);
			console.log('new key generated > ' + newKey);
			res.end(newKey);
		} else {
			res.writeHead(500);
			console.log('duplicate key found > ' + newKey);
			res.end();
		}
	});
});

module.exports = router;