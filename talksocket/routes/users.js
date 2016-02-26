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

		key_generator.findKey(req.body.remotekey, function(result) {
			if (result)
				res.end(JSON.stringify({
					redirect: '/room?key=' + req.body.remotekey
				}));
			res.end(JSON.stringify({
				redirect: '/login' + req.body.remotekey
			}));
		});
	} else if (lodash.has(req.body, 'ownkey') && req.body.ownkey) {
		console.log('ownkey auth');
		key_generator.keymodel.count({
			name: req.body.ownkey
		}, function(err, dbresult) {
			if (err) return err;
			if (dbresult > 0)
				res.end(JSON.stringify({
					redirect: '/room?key=' + req.body.ownkey
				}));
			else
				res.end(JSON.stringify({
					redirect: '/login?key=' + req.body.ownkey
				}));
			console.log('called back');
		});
	} else {
		res.end(JSON.stringify({
			error: 'room not found'
		}));
		console.log('response complete');
	}
});

module.exports = router;