var express = require('express');
var router = express.Router();
var sillyname = require('sillyname');
var key_generator = require('../lib/key-generator.js');

router.get('/', function(req, res){
	var newKey = sillyname().replace(/\s/g, "-").toLowerCase();
	newKey += '-' + Math.floor(100 + Math.random() * 900);

	if (!key_generator.findKey(newKey))
	{
		key_generator.addKey(newKey);
		res.end(newKey);
	}
	else
	{
		res.writeHead(500);
		res.end();
	}
});

module.exports = router;