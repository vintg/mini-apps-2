const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const request = require('request-promise');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.set('PORT', process.env.PORT || 800);

/*
This API currently only supports 'BPI' index available through
Coindesk's free API
*/

app.get('/api', (req, res) => {
  console.log('GET', req.query);
  const index = req.query.sym;
  const currency = req.query.mny;
  const start = req.query.star;
  const end = req.query.en;
  const realtime = req.query.rt;

  //historical price route ****************
  if(realtime==='false'){
      let uri = `https://api.coindesk.com/v1/${index}/historical/close.json?currency=${currency}`;
      if (start!=='' && end!=='') uri+= `&${start}&end=${end}`;

      const filepath = path.join(`${__dirname}/data/${index}-${currency}-${start}-${end}.json`);

      if (!fs.existsSync(filepath)) {
        console.log('request sent to',uri);
        request(uri).then(data=>{
          return new Promise((resolve, reject)=> {
            fs.writeFile(filepath, data, 'UTF-8', err=> { if (err) reject(err); else resolve(data); });
          })
          .then(res.status(200).send(data))
          .catch(err=>console.log(err))
        }).catch(err=>res.status(404).send(err));
      } else {
        console.log('retrieving cached data from',filepath);
        fs.readFile(filepath, (err, data) => {
          if (err) res.status(400).send(err);
          res.status(200).send(data);
        });
      }
  } else { //real-time priceroute ***************
      const uri = `https://api.coindesk.com/v1/${index}/currentprice/${currency}.json?`;
      console.log('request sent to',uri);
      request(uri).then( data=> res.status(200).send(data))
      .catch(err=>res.status(404).send(err));
  }

});

const server = app.listen(app.get('PORT'), () => {
  console.log(`Node server running on`, server.address());
});