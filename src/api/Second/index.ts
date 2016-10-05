"use strict";
import express = require('express');
let router = express.Router();
import * as fs from 'fs';
import {Second} from './Second'

/* GET home page. */ 
router.get('/', function(req, res, next) {
    let f = new Second()
    res.send({})
}); 



export = router;  