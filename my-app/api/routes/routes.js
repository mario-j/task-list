'use strict';
module.exports = function(app) {
  var taskItems = require('../controllers/taskItemsController');

  app.route('/api/get').get(taskItems.get_items)
};
