'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/carController');

  // todoList Routes
  app.route('/populate')
    .put(car.setData);


  app.route('/suv')
  	.get(car.getData)
};
