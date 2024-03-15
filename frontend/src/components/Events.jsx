import React from 'react';
import Event from './Event';

function Events(props) {
  
  const eventItems = props.events.map((event) => {
    return <Event key={event.id} data={event} addUserToEvent = {props.addUserToEvent} deleteEventFromUser = {props.deleteEventFromUser}/>;
  });
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {eventItems}
      </ul>
    );
  
//   const eventItems = Array.isArray(props.events)
//   ? props.events.map((event) => <Event key={event.id} data={event} />)
//   : null;

// return (
//   <ul role="list" className="divide-y divide-gray-100">
//     {eventItems}
//   </ul>
// );
}

export default Events;