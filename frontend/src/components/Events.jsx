import React from 'react';
import Event from './Event';

function Events(props) {
  const eventItems = props.events.map((event) => {
    return <Event key={event.id} data={event}/>;
  });
    return (
      <ul>
        {eventItems}
      </ul>
    );
}

export default Events;