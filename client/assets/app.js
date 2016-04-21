var app = angular.module('myApp', ['ngResource', 'ngRoute']);

app.factory('Job', function ($resource) {
        return $resource('/api/jobs/:jobid', null, {
            'update': {method: 'PUT'}
        });
    }
);


app.controller('JobController', function ($scope, $http, $routeParams, Job) {
    $scope.jobObject = {};
    if ($routeParams.jobid) {
        $scope.jobSingle = Job.get({jobid: $routeParams.jobid});
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

});


app.controller('ViewController', function ($scope, $http, Job) {
    $scope.jobs = Job.query();
});


app.controller('TwitterController', function ($scope) {
    $scope.tweets = [];
    $scope.tweet = '';
    $scope.addTweet = function () {
        $scope.tweets.push($scope.tweet);
        $scope.tweet = '';
    }

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