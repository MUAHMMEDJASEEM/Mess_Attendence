var express = require('express');
var router = express.Router();
mongodb://localhost:27017
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({name:"jaseem",year:2});
});

module.exports = router;
