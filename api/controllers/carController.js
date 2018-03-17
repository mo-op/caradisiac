'use strict';

var express = require('express');
var router = express.Router();

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var elasticsearch = require('elasticsearch');

exports.setData = function(req,res, next){
	 var client = new elasticsearch.Client({
    host: 'localhost:9200',
  });

//test for es
  client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('Elastic Cluster down');
  } else {
    console.log('Elastic Cluster Running');
  }
});
  
//getting data from the website and indexing it (is bulk index happening?)
  async function loadData () {
    const brands = await getBrands();
    brands.forEach(async brand => {
        const models = await getModels(brand);
        models.forEach(model => {
            var line ='{"brand":"'+model.brand+'","model":"'+model.model+'","volume":"'+model.volume+'","uuid":"'+model.uuid+'","name":"'+model.name+'"}';    
            
            var jsonObject = JSON.parse(line);
              
            client.create({
              index: 'cars',
              type: 'car',
              id: jsonObject['uuid'],
              body: jsonObject
            }, function (error, response) {
              if(error)
              {
                console.log(error);
              }
            });
        });    
    });
  }
  loadData();
//Call
}

exports.getData = function(req,res, next){
	//TO:DO

}

