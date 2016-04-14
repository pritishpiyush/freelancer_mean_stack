/**
 * Created by MUNAZIR AHSAN on 13-04-2016.
 */
var express = require('express');
var router = express.Router();
var Service = require('../models/service');

router.get('/', function (req, res) {
    Service.find({}, function (err, services) {
        if (err) {
            return res.json(err)
        }
        return res.json(services)
    })
})

router.post('/', function (req, res) {
    var service = new Service()
    service.name = req.body.service
    service.save(function (err, service) {
        if (err) {
            return res.json(err)
        }
        return res.json(service)
    })
})

router.get('/:id',function(req,res){
    Service.findOne({_id: req.params.id}, function(err,service){
        if(err){
            return res.json(err)
        }
        return res.json(service)
    })
})

router.put('/:id' , function(req,res) {
    Service.findOneAndUpdate({_id: req.params.id}, {name: req.body.service}, function (err, service) {
        if (err) {
            return res.json(err);
        }
        return res.json(service);
    })
})

router.delete('/:id' , function(req,res){
    Service.findOneAndRemove({_id: req.params.id}, function (err, service){
        if(err) {
            return res.json(err);
        }
        return res.json(service);
    })
})
module.exports = router;