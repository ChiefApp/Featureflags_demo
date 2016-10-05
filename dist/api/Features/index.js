"use strict";
const express = require('express');
let router = express.Router();
const FeaturePage_1 = require('./FeaturePage');
/* GET home page. */
router.get('/', function (req, res, next) {
    // let FFServerURL = "http://localhost:1338"
    // let  ff = new CustomFeatureLookup("WEB", FFServerURL, undefined)
    // let f = ff.getFeature("Dashboard", "dadadads")
    // f.then(feature => {
    //     console.log(feature);
    // }).catch(err => {
    //     console.log(err);
    // })
    let f = new FeaturePage_1.FeaturePage();
    //   console.log(f);
    f.valueOfFeature().then(feature => {
        res.send(feature);
    });
    // res.send({
    //         "featureKey": "Campaigns",
    //         "enabled": true,
    //         "variationName": "v2",
    //         "configurationData": { "this": "that" }
    // })
});
router.get('/feature/:featureKey', function (req, res, next) {
    res.send({
        "featureKey": "Campaigns2",
        "enabled": true,
        "variationName": "v2",
        "configurationData": { "this": "that" }
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map