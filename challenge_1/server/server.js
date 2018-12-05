const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(`${__dirname}/../public`));
app.use(cors());
app.set('PORT', process.env.PORT || 3000);
const Events = require('../data/Events');

app.get('/events', (req, res) => {
  console.log('params received', req.query);
  const search = (req.query.query)? {'description':{'$regex': req.query.query}} : {};

  Events.find(search)
    .limit(parseInt(req.query.limit))
    .skip(parseInt(req.query.offset))
    .exec()
    .then(data=>res.status(200).send(data))
    .catch(err=>res.status(404).send(err));
});

const server = app.listen(app.get('PORT'), () => {
  console.log(`Node server running on`, server.address());
});