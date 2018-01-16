define(['angular'], function(angular) {

    'use strict';

    /**
     * Initializes a new cryptocurrency pair with basic price data.
     * @constructor
     * @param {object} options - The constructor arguments.
     * @param {string} options.symbol - Symbol for cryptocurrency pair.
     * @param {number} options.price - The pair price.
     * @param {number} options.high - The price high for the past 24 hours.
     * @param {number} options.low - The price low for the past 24 hours.
     */
    function CryptoPair(options) {

        this.symbol = options.symbol;
        this.ask = options.ask;
        this.bid = options.bid;
        this.high = options.high;
        this.low = options.low;
        this.mid = options.mid;
        this.lastPrice = options.lastPrice;
        this.volume = options.volume;
        this.timestamp = options.timestamp;
        //add info for book
        this.amount = options.amount;
        this.timestamp2 = options.timestamp2;
        this.price = options.price;
    }

    angular.module('cryptick.models').service('CryptoPair', [CryptoPair]);

    return CryptoPair;
});