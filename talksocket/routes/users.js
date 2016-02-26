var express = require('express');
var router = express.Router();
var key_generator = require('../lib/key-generator.controller.js');
var lodash = require('lodash');

///* GET users listing. */
//router.get('/', function(req, res) {
//    res.render('user', { title: 'Home' });
//});

router.post('/', function(req, res) {
	console.dir(req.body);
	if (lodash.has(req.body, 'remotekey') && req.body.remotekey) {

		console.log('remotekey auth');
		key_generator.findKey(req.body.remotekey, function(err, result, content) {
			if (err)
				res.end(JSON.stringify({
					redirect: '/login?error'
				}));
			else if (result)
				res.end(JSON.stringify({
					redirect: '/room?key=' + req.body.remotekey + '&token=' + content[0].token
				}));
			else
				res.end(JSON.stringify({
					redirect: '/login?error=' + req.body.remotekey
				}));
		});

	} else if (lodash.has(req.body, 'ownkey') && req.body.ownkey) {
		console.log('ownkey auth');
		key_generator.findKey(req.body.ownkey, function(err, result, content) {
			if (err)
				res.end(JSON.stringify({
					redirect: '/login?error'
				}));
			else if (result)
				res.end(JSON.stringify({
					redirect: '/room?key=' + req.body.ownkey + '&token=' + content[0].token
				}));
			else
				res.end(JSON.stringify({
					redirect: '/login?error=' + req.body.ownkey
				}));
		});
	}
});

module.exports = router;