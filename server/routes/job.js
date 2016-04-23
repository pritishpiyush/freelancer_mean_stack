/**
 * Created by pritish on 14-04-2016.
 */
var express = require('express');
var router = express.Router();
var Job = require('../models/job');
var Comment = require('../models/comments');

router.get('/', function (req, res) {
    Job.find({})
        .populate('user')
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
    job.user = req.user._id;
    job.save(function (err, job) {
        if (err) {
            return res.json(err)
        }
        return res.json(job)
    })
})

router.get('/:id', function (req, res) {

    Job.findOne({_id: req.params.id})
        .populate('user')
        .exec( function (err, job) {
            if (err) {
                return res.json(err);
            }
            return res.json(job);
        })
})

router.put('/:id', function (req, res) {

    Job.findOneAndUpdate({_id: req.params.id}, {duration: req.body.job},
        {person: req.body.job}, {description: req.body.job}, {price_min: req.body.job},
        {price_max: req.body.job}, {locality: req.body.job}, {begin: req.body.job}, {name: req.body.job},
        {name: req.body.job},
        function (err, job) {
            if (err) {
                return res.json(err);
            }
            return res.json(job);
        })

});
router.delete('/:id', function (req, res) {

    Job.findOneAndRemove({_id: req.params.id}, function (err, job) {
        if (err) {
            return res.json(err);
        }
        return res.json(job);
    })

});

router.get('/:id/comments', function (req, res) {
    Comment.find({job: req.params.id})
        .populate('user')
        .sort('-created_at')
        .exec(function (err, jobs) {
            if (err) {
                return res.json({error: err});
            }
            return res.json(jobs)
        });
})

router.post('/:id/comments', function (req, res, next) {

    if (!req.user) {
        res.json({error: 'Not signed in'});
    } else {

        var comment = new Comment();
        comment.body = req.body.comment;
        comment.user = req.user._id;
        comment.job = req.params.id;
        comment.save(function (err, comment) {
            if (err || !comment) {
                res.json({error: 'comment not posted'});
            } else {
                comment.user = req.user;
                res.json(comment);
            }

        });

    }

});


module.exports = router;