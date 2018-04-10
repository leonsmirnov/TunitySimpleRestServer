var express = require('express');
var router = express.Router();
var reqs = require('../controllers/clientRequestController')


router.get('/prev', reqs.prevIpAddr);
router.get('/total', reqs.getRequestCount);
router.get('/stats', reqs.serverStats);


module.exports = router;