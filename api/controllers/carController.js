'use strict';

var express = require('express');
var router = express.Router();

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var elasticsearch = require('elasticsearch');

	 // var client = new elasticsearch.Client({
  //   host: 'localhost:9200',
  // });

//test for es
//   client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error('Elastic Cluster down');
//   } else {
//     console.log('Elastic Cluster Running');
//   }
// });
  
//getting data from the website and indexing it (is bulk index happening?)

exports.getData = function(req,res){
	res.send("Hello");
};

exports.getData = function(req,res){
	//TO:DO
	res.send("Hello");
};

