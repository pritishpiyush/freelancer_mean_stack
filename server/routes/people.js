/**
 * Created by MUNAZIR AHSAN on 14-04-2016.
 */
var express = require('express');
var router = express.Router();
var People = require('../models/people');

router.get('/', function (req, res) {

    People.find({},function(err,peoples){
        if (err) {
            return res.json({error: err})
        }
    }
    return res.json(peoples)
})