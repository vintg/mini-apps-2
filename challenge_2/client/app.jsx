import React, { Component } from 'react';
import axios from 'axios';

import Search from './components/search';
import Charts from './components/chart';
import Current from './components/current';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      symbol:'BPI',
      currency: 'USD',
      start: '',
      end: ''
    };
    this.updateSymbol = this.updateSymbol.bind(this);
  }

  getRealTimeData(){
    axios.get('/api', {
      params: {
        sym: this.state.symbol,
        mny: this.state.currency,
        rt: true
      }
    }).then((res)=> {
      this.setState({
        currentprice: res.data.bpi.USD.rate_float,
        lastupdated: res.data.time.updated
      });
      console.log('realtime data:',res.data);
    }).catch((err)=> console.log(err));
  }

  getHistoricalData() {
    axios.get('/api', {
      params: {
        sym: this.state.symbol,
        mny: this.state.currency,
        star: this.state.start,
        en: this.state.end,
        rt: false
      }
    }).then((res)=> {
      this.setState({
        data: this.preprocess(res.data)
      });
      console.log('historical data:\n',res.data);
    }).catch((err)=> console.log(err));
  }

  preprocess(data) {
    return {
      labels: Object.keys(data.bpi),
      datasets: [{
            backgroundColor: "rgba(66,134,244,0.3)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
        data: Object.values(data.bpi)
      }]
    };
  }

  componentDidMount() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1;
    const yyyy = today.getFullYear();

    this.setState({
      start: `${yyyy-1}-${mm}-${dd}`,
      end: `${yyyy}-${mm}-${dd}`
    }, () => {
      this.getHistoricalData();
    });

    setInterval(this.getRealTimeData(), 60000);
  }

  updateSymbol(e){
    e.preventDefault();
    this.setState({symbol: e.target.value});
  }

  render() {
    return (
      <div className="wrapper">
        <div className = "nav">
          <Search handleTickerChange={this.updateSymbol} />
          <Current price={this.state.currentprice} lastupdated={this.state.lastupdated}/>
        </div>
        <Charts data={this.state.data} ticker={this.state.symbol}/>
      </div>
    );
  }
};
