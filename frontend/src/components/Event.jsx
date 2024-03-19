import React from 'react';
import { handleAuthClick } from "../helper/calendar"


function MyEvents(props) {
    const handleAddEventClick = () => {
    const userId = props.loggedIn.id;
    const eventId = props.data.id;
    props.addUserToEvent(userId, eventId);
    handleAuthClick(props);
};

const handleDeleteEventClick = () => {
    const userId = props.loggedIn.id;
    const eventId = props.data.id;
    props.deleteEventFromUser(userId, eventId);

};
  return (
 <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://picsum.photos/200" alt=""/>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{props.data.event_name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{props.data.event_details}</p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-row sm:items-center">
      <button className="bg-transparent hover:bg-gray-100 text-black-700 font-semibold hover:text-gray-500 py-2 px-4 border border-black-500 hover:border-transparent rounded-full" type="button" onClick={handleAddEventClick}>Sign Up</button>
      <button className="bg-transparent hover:bg-gray-100 text-black-700 font-semibold hover:text-gray-500 py-2 px-4 border border-black-500 hover:border-transparent rounded-full" type="button" onClick={handleDeleteEventClick}>Withdraw</button>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900">{props.data.start_time} - {props.data.end_time} {props.data.event_date}</p>
      <p className="mt-1 text-xs leading-5 text-gray-500">{props.data.event_address} </p>
      <p className="mt-1 text-xs leading-5 text-gray-500">{props.data.city} </p>
    </div>
  </li>
  );
}

export default MyEvents;



