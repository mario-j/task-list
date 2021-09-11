const csv = require('csv-parser');
const fs = require('fs');
const TaskItem = require('../models/taskItem');
let items = [{id: 1, description: 'test'}];

exports.get_items = function(req, res) {
    res.send(items);
};
