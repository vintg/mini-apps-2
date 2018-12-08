const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.set('PORT', process.env.PORT || 3000);

const server = app.listen(app.get('PORT'), () => {
  console.log(`Node server running on`, server.address());
});