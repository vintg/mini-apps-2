import React, { Component } from 'react';
import axios from 'axios';

import Search from './components/search';
import Chart from './components/chart';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
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
      this.setState({currentprice: res.data});
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
        data: res.data
      });
      console.log('historical data:\n',res.data);
    }).catch((err)=> console.log(err));
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

    setInterval(this.getRealTimeData(), 1000);
  }

  updateSymbol(e){
    e.preventDefault();
    this.setState({symbol: e.target.value});
  }

  render() {
    return (
      <div className="wrapper">
         <Search handleTickerChange={this.updateSymbol} />
         <Chart data={this.state.data} />
      </div>
    );
  }
};
