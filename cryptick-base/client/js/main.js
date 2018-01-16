require.config({

    paths: {
        'angular': '/bower_components/angular/angular',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        bootstrap: {
            deps: ['jquery']
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular',
        }
    }
});

require([
        'angular',
        'bootstrap'
    ],
    function(angular, bootstrap) {

        'use strict';

        angular.module('cryptick.models', []);
        angular.module('cryptick.services', ['cryptick.models']);
        angular.module('cryptick.controllers', ['cryptick.services', 'cryptick.models']);
        angular.module('cryptick.app', ['cryptick.controllers']);

        require(['app'], function(app) {
            app.init();
        });
    });