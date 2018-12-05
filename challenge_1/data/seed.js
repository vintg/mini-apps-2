const mongoose = require('mongoose');
const db = require('./db');
const Event = require('./Events.js');
const data = require('./db.json');

Event.insertMany(data.events)
  .then(() => console.log('data successfully inserted'))
  .catch(err => console.log(err));