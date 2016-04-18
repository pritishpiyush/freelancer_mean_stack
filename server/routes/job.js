/**
 * Created by pritish on 14-04-2016.
 */
var express = require('express');
var router = express.Router();
var Job = require('../models/job');
router.get('/', function (req, res) {
    Job.find({})
        .populate('city service')
        .exec(function (err, jobs) {
            if (err) {
                return res.json({error: err});
            }
            return res.json(jobs)
        });
})

router.post('/', function (req, res) {

    var job = new Job();
    job.duration = req.body.duration;
    job.person = req.body.person;
    job.description = req.body.description;
    job.price_min = req.body.price_min;
    job.price_max = req.body.price_max;
    job.locality = req.body.locality;
    job.begin = req.body.begin;
    job.city = req.body.city;
    job.service = req.body.service;

    job.save(function (err, job) {
        if (err) {
            return res.json(err)
        }
        return res.json(job)
    })
})

router.get('/:id', function (req, res) {

    Job.findOne({_id: req.params.id}, function (err, job) {
        if (err) {
            return res.json(err);
        }
        return res.json(job);
    })

})

router.put('/:id', function(req, res){

    Job.findOneAndUpdate({_id: req.params.id}, {duration: req.body.job},
        {person: req.body.job},{description: req.body.job},{price_min: req.body.job},
        {price_max: req.body.job},{locality: req.body.job},{begin: req.body.job},{name: req.body.job},
        {name: req.body.job},
        function(err, job){
        if(err){
            return res.json(err);
        }
        return res.json(job);
    })

})
router.delete('/:id', function(req, res){

    Job.findOneAndRemove({_id: req.params.id}, function(err, job){
        if(err){
            return res.json(err);
        }
        return res.json(job);
    })

})

module.exports = router;