var express = require('express');
var router = express.Router();
var City = require('../models/city');

router.get('/', function (req, res) {

    City.find({}, function (err, cities) {
        if (err) {
            return res.json({error: err})
        }
        return res.json(cities);
    })

})

router.post('/', function(req, res){

    var city = new City();
    city.name = req.body.city;

    city.save(function(err, city){
        if(err){
            return res.json(err)
        }
        return res.json(city)
    })

})

router.get('/:id', function(req, res){

    City.findOne({_id: req.params.id}, function(err, city){
        if(err){
            return res.json(err);
        }
        return res.json(city);
    })

})

router.put('/:id', function(req, res){

    City.findOneAndUpdate({_id: req.params.id}, {name: req.body.city}, function(err, city){
        if(err){
            return res.json(err);
        }
        return res.json(city);
    })

})

router.delete('/:id', function(req, res){

    City.findOneAndRemove({_id: req.params.id}, function(err, city){
        if(err){
            return res.json(err);
        }
        return res.json(city);
    })

})

module.exports = router;