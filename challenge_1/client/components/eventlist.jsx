import React, { Component } from 'react';

const EventList =({data})=> (
  <div className="eventList">
    <ul>{data.map((event,idx)=>
      <li key={idx}>
        <div className = 'event-date'> {event.date<0? event.date.slice(1)+' BC': event.date}
        </div>
        <div className = 'event-desc'> {event.description}
          <button className ='event-edit'> edit </button>
          <button className ='event-save'> save </button>
        </div>
      </li>
    )}</ul>
  </div>
);

export default EventList;