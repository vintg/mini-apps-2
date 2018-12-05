import React from 'react';

const Search =({updateQuery}) => (
  <div className = 'search-container'>
    <div className="search-bar">
      <input className="search-form" type="text"
        onKeyPress={ (e) => {
          if(e.key === 'Enter')
            $('.search-submit').trigger('click');
        }}/>
      <button className="search-submit"
        onClick={ () => {
          const query = document.getElementsByClassName('search-form')[0].value;
          updateQuery(query);
        }}>
      </button>
    </div>
  </div>
);

export default Search;
