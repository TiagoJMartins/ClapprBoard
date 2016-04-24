var request = require('request');
var async = require('async');
var xml2js = require('xml2js');

module.exports = function(Show) {
  Show.beforeCreate = function(next, modelInstance) {
    var API_KEY = '3CD608E0AEEFAEA6';

    next();
  };
};
