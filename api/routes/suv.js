const elasticsearch = require('elasticsearch');
const es = require('./connection')

var client = es.client

/**
Function:
-go through data using query to get cars with largest volume
*/

exports.getSuv = (callback) => {
  client.search({
    index: 'cars',
    type: 'car',
    body: {
      sort: {
        volume: {
          order: 'desc'
        }
      }
    }
  }).then(function(resp) {
    var hits = resp.hits.hits;
    return callback(null, hits)
  }, function(err) {
    console.trace(err.message)
  })
}
