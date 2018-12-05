import React, { Component } from 'react';

const EventList =({data, editEvent, saveEvent})=> (
  <div className="eventList">
    <ul>{data.map((event,idx)=>
      <div key={idx}>
      <li id = {event._id} className='event-container'>
        <div className = 'event-date'>
          {event.date<0? event.date.slice(1)+' BC': event.date}
        </div>
        <div className = 'event-desc'> {event.description}</div>
      </li>
      <div className ='event-control'>
        <button className ='event-edit'
         onClick={() => {
            const item = document.getElementsByClassName('event-container')[0];
            editEvent(item);
         }}> edit
        </button>
        <button className ='event-save'
         onClick={() => {
            const item = document.getElementsByClassName('event-container')[0];
            saveEvent(item);
         }}> save
        </button>
      </div>
    </div>
    )}</ul>
  </div>
);

export default EventList;