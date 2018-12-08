import React, {Component} from 'react';

const Pins =({pins, handleClick})=> (
  <div className = 'bowling-pins'>
    {pins.map((pin,idx)=>
      <button key={idx}
        className='pin-button'
        value={pin}
        onClick={handleClick}>
        {pin}
      </button>
    )}
  </div>
);

export default Pins;