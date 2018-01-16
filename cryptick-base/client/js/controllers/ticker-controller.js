define([
        'angular',
        'services/bitfinex-api',
        'models/crypto-pair'
    ],
    function(angular, bitfinexApiModule, CryptoPair) {

        'use strict';

        function TickerController($interval, bitfinexApi) {

            this.$interval = $interval;
            this.bitfinexApi = bitfinexApi;

            this.model = {
                pair: new CryptoPair({ symbol: 'BTCUSD' })
            };

            this._initialize();

            //this._initialize2();
        }

        /**
         * @private
         */
        TickerController.prototype._initialize = function(){
            //can refactor code, to display once before the 3 second wait
            //this.$interval(function() {
            // Initialize the timer and start requesting the price...

                this.bitfinexApi.getTickerForPair(this.model.pair.symbol).then(function(data) {
                    this.model.pair = data;
                    console.log(data)
                }.bind(this), function(error) {
                    console.log("Error");
                });

                this.bitfinexApi.getBook(this.model.pair.symbol).then(function(data) {
                    this.model.pair = data;
                    //console.log(data)
                    //console.log("heyyyya");
                }.bind(this), function(error) {
                    console.log("Error");
                });

             //}.bind(this),3000); //if I say 3000 - it literally takes 30seconds?

        };

        // TickerController.prototype._initialize2 = function(){
        //     //can refactor code, to display once before the 3 second wait
        //     // Initialize the timer and start requesting the price...

        //     this.bitfinexApi.getBook(this.model.pair.symbol).then(function(data) {
        //         this.model.pair = data;
        //         //console.log(data)
        //         //console.log("heyyyya");
        //     }.bind(this), function(error) {
        //         console.log("Error");
        //     });


        // }

        angular.module('cryptick.controllers').controller('TickerController', [
            '$interval',
            'bitfinexApi',
            TickerController
        ]);
    });