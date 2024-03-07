import React from 'react';

function MyEvents(props) {
  return (
 <li className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://picsum.photos/200" alt=""/>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{props.data.event_name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{props.data.event_details}</p>
      </div>
    </div>
    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <p className="text-sm leading-6 text-gray-900">{props.data.start_time} {props.data.event_date}</p>
      <p className="mt-1 text-xs leading-5 text-gray-500">{props.data.event_address} </p>
      <p className="mt-1 text-xs leading-5 text-gray-500">{props.data.city} </p>
    </div>
  </li>
  );
}

export default MyEvents;