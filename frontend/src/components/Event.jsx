import React from 'react';

function MyEvents(props) {
  return (
 <li>
      <h1>Events</h1>
      <p>Event Name: {props.data.event_name}</p>
      <p>Event Details: {props.data.event_details}</p>

    </li>
  );
}

export default MyEvents;