var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login' });
});

/*POST login form*/


module.exports = router;
