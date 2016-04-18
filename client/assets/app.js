var app = angular.module('myApp', ['ngResource', 'ngRoute']);

app.controller('JobController', function ($scope) {

});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/html/demo.html',
            controller: 'JobController'
        }).when('/home', {
            templateUrl: '/html/demo.html',
            controller: 'JobController'
        })
        .otherwise({
            templateUrl: '/html/demo.html',
            controller: 'JobController'
        });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});