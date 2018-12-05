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
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  loadEventsFromServer() {
    const limit = this.state.perPage;
    const offset = this.state.offset;
    const query = this.state.query;

    axios.get(`http://localhost:3000/events?_page=${offset}&_limit=${limit}&_description=${query}`)
    .then((res)=> {
      console.log(res.data);
      this.setState({
        data: res.data,
        pageCount: this.state.pageCount
      });
    }).catch((err)=> console.log(err));
  }

  componentDidMount() {
    this.loadEventsFromServer();
  }

  updateQuery(q){
    this.setState({ query: q}, () => {
      this.loadEventsFromServer();
    });
  }

  handlePageClick (data) {
    const selected = parseInt(data.selected);
    const offset = Math.floor(selected * this.state.perPage);

    this.setState({offset: offset}, () => {
      this.loadEventsFromServer();
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Search updateQuery={this.updateQuery}/>
        <EventList data={this.state.data} />
        <div id="react-paginate">
        <ReactPaginate previousLabel={"prev"}
                       nextLabel={"next"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
        </div>
      </div>
    );
  }
};
