"use strict";
const express = require('express');
let router = express.Router();
const Second_1 = require('./Second');
/* GET home page. */
router.get('/', function (req, res, next) {
    let f = new Second_1.Second();
    res.send({});
});
module.exports = router;
//# sourceMappingURL=index.js.map