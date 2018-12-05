const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/Events', { useNewUrlParser: true });

module.exports = db;
