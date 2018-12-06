import React from 'react';

const Current =({price, lastupdated})=> (
  <div className = "current-container">
    {price}
    <div className="last-updated">
      Last updated: {lastupdated}
    </div>
  </div>
);

export default Current;

