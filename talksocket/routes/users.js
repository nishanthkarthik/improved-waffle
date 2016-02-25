var express = require('express');
var router = express.Router();
var key_generator = require('../lib/key-generator.js');
var lodash = require('lodash');

///* GET users listing. */
//router.get('/', function(req, res) {
//    res.render('user', { title: 'Home' });
//});

var autoredirect = function(_key) {
	if (key_generator.findKey(_key))
		return "/room?id=" + _key;
	return "/login";
};

router.post('/', function(req, res) {
	console.dir(req.body);
	if (lodash.has(req.body,'remotekey') && req.body.remotekey)
	{
		console.log('remotekey auth');
		var result = autoredirect(req.body.remotekey);
		console.log(result);
		res.end(JSON.stringify({
			"redirect": result
		}));
	}	
	else if (lodash.has(req.body,'ownkey') && req.body.ownkey)
	{
		console.log('ownkey auth');
		var result = autoredirect(req.body.ownkey);
		console.log(result);
		res.end(JSON.stringify({
			"redirect": autoredirect(req.body.ownkey)
		}));
	}
	else
	{
		res.end(JSON.stringify({error: 'room not found'}));
		console.log('response complete');
	}
});

module.exports = router;
