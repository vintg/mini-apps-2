import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import EventList from './components/eventlist';
import Search from './components/search';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      offset: 0,
      perPage: 10,
      pageCount: 10,
      query: '',
      currentPage: 1
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  loadEventsFromServer() {
    axios.get('/events', {
      params: {
        query: this.state.query,
        offset: this.state.offset,
        limit: this.state.perPage*(this.state.pageCount)
      }
    }).then((res)=> {
      this.setState({
        data: res.data,
        pageCount: Math.floor(res.data.length/this.state.perPage)
      });
    }).catch((err)=> console.log(err));
  }

  componentDidMount() {
    this.loadEventsFromServer();
  }

  updateQuery(q){
    this.setState({
      query: q,
      data: [],
      offset:0,
      pageCount:10
    }, () => {
      this.loadEventsFromServer();
    });
  }

  handlePageClick (pg) {
    const selected = parseInt(pg.selected);
    const offset = Math.ceil(selected * this.state.perPage);

    if(this.state.pageCount<=selected+5)
      this.setState({pageCount: this.state.pageCount+10});

    this.setState({
      offset: offset,
      currentPage: selected,
    }, () => {
      this.loadEventsFromServer();
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Search updateQuery={this.updateQuery}/>
        <EventList data={this.state.data.slice(0, this.state.perPage)} />
        <div id="react-paginate">
        <ReactPaginate previousLabel={"prev"}
                       nextLabel={"next"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
      </div>
    );
  }
};
