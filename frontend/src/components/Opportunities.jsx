import React, { useEffect } from 'react';
import Event from './Event';
import { useLocation } from 'react-router-dom'


function Opportunities(props) {
  const loc = useLocation();

  useEffect(() => {
    props.setLocation(loc.pathname);
  }, [loc.pathname]);


  const eventItems =
    props.events ? props.events.map((event) => {
      return <Event
        key={event.id}
        data={event}
        addUserToEvent={props.addUserToEvent}
        deleteEventFromUser={props.deleteEventFromUser}
        loggedIn={props.loggedIn}
        location={props.location}
      />;
    }) : <div></div>
  return (
    <ul role="list" className="divide-y divide-gray-100 home-route">
      {eventItems}
    </ul>
  );
}

export default Opportunities;


