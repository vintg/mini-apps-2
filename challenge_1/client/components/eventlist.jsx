import React, { Component } from 'react';

/* data example
{"events": [
  {"date": "-300", "description": "Pilgrims travel to the healing temples of Asclepieion to be cured of their ills. After a ritual purification the followers bring offerings or sacrifices.", "lang": "en", "category1": "By place", "category2": "Greece", "granularity": "year"}
*/

const EventList =({data})=> (
  <div className="eventList">
    <ul>{data.map((event,idx)=>
      <li key={idx}>
        <div className = 'event-date'> {event.date<0? event.date.slice(1)+' BC': event.date} </div>
        <div className = 'event-desc'> {event.description} </div>
      </li>
    )}</ul>
  </div>
);

export default EventList;