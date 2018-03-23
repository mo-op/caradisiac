const {
  getBrands,
  getModels
} = require('node-car-api');

const con = require('./connection')

var client = con.client

function headerElasticSearch(id) {
  return
}


function addIndexElastic(tab) {
  var indexedData = []
  for (var i in tab) {
    indexedData.push({
      index: {
        _index: 'cars',
        _type: 'car',
        _id: i
      }
    })
    indexedData.push(tab[i])
  }
  console.log(indexedData)
  client.bulk({
    body: indexedData
  }, function(err, resp) {

  });
}

exports.addInElastic = (callback) => {
  console.log("Scrapping car models...");
  getBrands().then(function(brands) {
    let promises = []
    for (var i = 0; i < brands.length; i++) {
      console.log(brands[i]);
      promises.push(getModels(brands[i]))
    }
    Promise.all(promises).then(function(models) {
      var cars = []
      for (var i = 0; i < models.length; i++) {
        for (var j = 0; j < models[i].length; j++) {
          if (models[i][j]['volume'] != 0) {
            models[i][j]['volume'] = parseInt(models[i][j]['volume'])
          } else {
            models[i][j]['volume'] = -1
          }
        }
        cars = cars.concat(models[i])
      }
      addIndexElastic(cars)
      return callback(null, cars)
    })
  })
}