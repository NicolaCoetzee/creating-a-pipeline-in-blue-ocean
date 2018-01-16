define([
        'angular',
        'models/crypto-pair'
    ],
    function(angular, CryptoPair) {

        'use strict';

        var CORS_PROXY_URL = 'http://cors-proxy.htmldriven.com';
        var BFX_API_URL = 'https://api.bitfinex.com/v2/';

        /**
         * @constructor
         */
        function BitfinexApi($http, $q) {

            this.$http = $http;
            this.$q = $q;
        }

        /**
         * Retrieves an up to date overview of the specified crypto pair.
         * @public
         * @param {string} symbol - The crypto pair symbol to retrieve the overview for.
         * @returns {Promise} - A promise.
         */
        BitfinexApi.prototype.getTickerForPair = function(symbol) {

            // Use the Angular $http service to request the price using the exchange's public API.
            // Process results using the promise returned by $http.
            // Return processed results via a new promise, one that we created.
            // This method must return our promise.

            var $q = this.$q;
            var deferred = $q.defer();
            
            //use v2 and tBTCUSD to avoid using cors
            this.$http.get(`http://cors-proxy.htmldriven.com/?url=https://api.bitfinex.com/v1/pubticker/BTCUSD`).then(function(response) {

                var data = JSON.parse(response.data.body)

                deferred.resolve(new CryptoPair({
                    symbol: symbol,
                    bid: data.bid,
                    ask: data.ask,
                    high: data.high,
                    low: data.low,
                    mid: data.mid,
                    lastPrice: data.last_price,
                    volume: data.volume,
                    timestamp: new Date(data.timestamp * 1000)
                }));
            });

            return deferred.promise;
        };

        BitfinexApi.prototype.getBook = function(symbol){

            var $q = this.$q;
            var deferred = $q.defer();

            this.$http.get(`http://cors-proxy.htmldriven.com/?url=https://api.bitfinex.com/v1/book/BTCUSD`).then(function(response) {

                var data = JSON.parse(response.data.body)
                console.log(data);
                console.log(data.bids[0]);

                    deferred.resolve(new CryptoPair({
                    symbol: symbol,
                    price: data.bids.price,
                    amount: data.bids.amount,
                    timestamp2: new Date(data.bids.timestamp2 * 1000)
                }));
            });

            return deferred.promise;

        };

        angular.module('cryptick.services').service('bitfinexApi', [
            '$http',
            '$q',
            BitfinexApi
        ]);
    });