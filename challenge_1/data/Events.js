const mongoose = require('mongoose');
const db = require('./db');

mongoose.Promise = global.Promise;

const eventSchema = new mongoose.Schema({
  date: String,
  description: String,
  lang: String,
  category1: String,
  category2: String,
  granularity: String
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;