import React, { useEffect } from 'react';
import Event from './Event';
import { useLocation } from 'react-router-dom'


function Opportunities(props) {
  const loc = useLocation();

useEffect(() => {
    console.log("Opportunities Location: ", loc.pathname);
    // props.setLocation(loc.pathname);
    console.log("Opportunities location2: ", props.location);
  }, [loc.pathname]);


  const eventItems = 
      props.events ? props.events.map((event) => {
    return <Event key={event.id} data={event} addUserToEvent = {props.addUserToEvent} deleteEventFromUser = {props.deleteEventFromUser} loggedIn = {props.loggedIn}/>;
  }) : <div></div>
  return (
   <ul role="list" className="divide-y divide-gray-100">
        {eventItems}
      </ul>
  );
}

export default Opportunities;