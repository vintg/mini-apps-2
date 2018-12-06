import React from 'react';

var Search = ({handleTickerChange}) => (
  <div className="search-container">
    <input className="search-input" type="text"
      onChange={handleTickerChange} />
  </div>
);

export default Search;
