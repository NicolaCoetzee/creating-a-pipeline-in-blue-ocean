define([
        'angular',
        'controllers/ticker-controller'
    ],
    function(angular, TickerController) {

        'use strict';

        var app = angular
            .module('cryptick.app')
            .controller('AppController', [
                '$scope',
                '$interval',
                function($scope, $interval) {

                    this.model = {
                        time: null
                    };

                    $interval(function() {
                        this.model.time = new Date(Date.now()).toLocaleString();
                    }.bind(this), 1000);
                }
            ])
            .run(function() {
                // Runs once Angular has done bootstrapping.
            });

        app.init = function() {
            angular.bootstrap(document, ['cryptick.app'], { strictDi: true });
        };

        return app;
    });