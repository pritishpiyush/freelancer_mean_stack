var app = angular.module('myApp', ['ngResource', 'ngRoute']);

app.factory('Job', function ($resource) {
        return $resource('/api/jobs/:jobid', null, {
            'update': {method: 'PUT'}
        });
    }
);

app.factory('Comment', function ($resource) {
        return $resource('/api/jobs/:jid/comments', null, {
            'update': {method: 'PUT'}
        });
    }
);


app.controller('JobController', function ($scope, $http, $routeParams, Job, Comment) {
    $scope.jobObject = {};
    if ($routeParams.jobid) {
        $scope.jobSingle = Job.get({jobid: $routeParams.jobid});
        $scope.comments = Comment.query({jid: $routeParams.jobid});
    }
    $scope.postJob = function () {
        var newJob = new Job();
        newJob.begin = $scope.jobObject.begin;
        newJob.city = $scope.jobObject.city;
        newJob.description = $scope.jobObject.description;
        newJob.duration = $scope.jobObject.duration;
        newJob.locality = $scope.jobObject.locality;
        newJob.person = $scope.jobObject.person;
        newJob.price_max = $scope.jobObject.price_max;
        newJob.price_min = $scope.jobObject.price_min;
        newJob.service = $scope.jobObject.service;


        newJob.$save(function (job) {
                console.log(job);
                if (!job.error) {
                    window.location = '/'
                }
            },
            function (err) {
                console.log(err);
            })
    }

    // Moment js
    $scope.timeInWords = function(date) {
        return moment(date).fromNow();
    };

    $scope.postComment = function () {
        var newComment = new Comment();
        newComment.comment = $scope.commentBody;
        newComment.$save({jid: $routeParams.jobid}, function (comment) {
            console.log(comment);
            if (!comment.error) {
                $scope.commentBody = '';
                $scope.comments.unshift(comment)
            }
        });
    }

});


app.controller('ViewController', function ($scope, $http, Job) {
    $scope.jobs = Job.query();
});


app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/home', {
            templateUrl: '/html/home.html',
            controller: 'ViewController'
        })
        .when('/postjob', {
            templateUrl: '/html/demo.html',
            controller: 'JobController'
        })
        .when('/jobs/:jobid', {
            templateUrl: '/html/job_single.html',
            controller: 'JobController'
        })
        .otherwise({
            templateUrl: '/html/view.html',
            controller: 'ViewController'
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});