import React, { useState } from 'react';
import { handleAuthClick } from "../helper/calendar";
import '../styles/Event.scss';
import { toast } from 'react-toastify';




//Fromat time from 4pm to 24hr clock format
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  let hourNum = parseInt(hours, 10);
  const period = hourNum >= 12 ? 'pm' : 'am';
  hourNum = hourNum % 12 || 12;
  return `${hourNum}:${minutes}${period}`;
}

//format date to store in DB
function formatDate(dateStr) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [year, month, day] = dateStr.split('-');
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

function MyEvents(props) {

  //When user signs up for an event with the sign up button
  const handleAddEventClick = () => {
    const userId = props.loggedIn.id;
    const eventId = props.data.id;
    setClick(!isClick);
    props.addUserToEvent(userId, eventId);
    handleAuthClick(props);

  };

  //When a user deletes an event they created with the delete button
  const handleDeleteEventClick = () => {
    const eventId = props.data.id;
    props.deleteEvent(eventId);
    // toast.success("Event deleted successfully!");
  };

  //When a user withdraws from an event they signed up for by pressing withdraw button
  const handleWithdrawEventClick = () => {
    const userId = props.loggedIn.id;
    const eventId = props.data.id;
    props.deleteEventFromUser(userId, eventId);
  };

  const [isClick, setClick] = useState(false);
  return (
    <li className="flex justify-between items-center gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div>
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`https://picsum.photos/${props.data.id}00`} alt="" />

        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{props.data.event_name}</p>
          <p className="mt-1 text-xs leading-5 text-gray-500 multiline-text">{props.data.event_details}</p>
        </div>

        <div className="flex items-center">

          {props.data.creator.id === props.loggedIn.id ? (
            <button
              className="relative text-black-700 " type="button"
                onClick={handleDeleteEventClick}>
              <div className="absolute min-w-40 inset-x-0 h-full -bottom-2 bg-gray-200 border border-gray-100 rounded-full mr-4"></div>
              <div className="relative min-w-40 font-semibold bg-white border rounded-full px-4 py-2 transition transform active:translate-y-2 mr-4 hover:bg-gray-50 hover:text-gray-500"
                
              >Delete</div>
            </button>

            // <button className="bg-transparent min-w-40 hover:bg-gray-100 text-black-700 font-semibold hover:text-gray-500 py-2 px-4 border border-black-500 hover:border-transparent rounded-full" type="button" onClick={handleDeleteEventClick}>
            //   Delete Event
            // </button>
          ) : (
            props.location === "/volunteer" ? (
              <>
                <button
                  className="relative text-black-700" type="button"
                    onClick={handleAddEventClick}>
                  <div className="absolute min-w-40 inset-x-0 h-full -bottom-2 bg-gray-200 border border-gray-100 rounded-full mr-4"></div>
                  <div className="relative min-w-40 font-semibold bg-white border rounded-full px-4 py-2 transition transform active:translate-y-2 mr-4 hover:bg-gray-50 hover:text-gray-500"
                    
                  >Sign Up</div>
                </button>
                {/* <button className="bg-transparent min-w-40 hover:bg-gray-100 text-black-700 font-semibold hover:text-gray-500 py-2 px-4 border border-black-500 hover:border-transparent rounded-full" type="button" onClick={handleAddEventClick}>
                  Sign Up

                </button> */}
              </>
            ) : (
              <button
                className="relative text-black-700" type="button"
                  onClick={handleWithdrawEventClick}>
                <div className="absolute min-w-40 inset-x-0 h-full -bottom-2 bg-gray-200 border border-gray-100 rounded-full mr-4"></div>
                <div className="relative min-w-40 font-semibold bg-white border rounded-full px-4 py-2 transition transform active:translate-y-2 mr-4 hover:bg-gray-50 hover:text-gray-500"
                  
                >Withdraw</div>
              </button>
              // <button className="bg-transparent min-w-40 hover:bg-gray-100 text-black-700 font-semibold hover:text-gray-500 py-2 px-4 border border-black-500 hover:border-transparent rounded-full" type="button" onClick={handleWithdrawEventClick}>
              //   Withdraw
              // </button>
            )
          )}

        </div>
      </div>
      <div className="flex min-w-0 gap-x-4 event-details">
        <div>
          <p className="mt-1 text-xs leading-5 text-gray-900 font-semibold">When:</p>
          <p className="mt-1 text-xs leading-5 text-gray-900 font-semibold">Date:</p>
          <p className="mt-1 text-xs leading-5 text-gray-900 font-semibold">Creator:</p>
        </div>
        <div>
          <p className="mt-1 text-xs leading-5 text-gray-900">{formatTime(props.data.start_time)} - {formatTime(props.data.end_time)}</p>
          <p className="mt-1 text-xs leading-5 text-gray-900">{formatDate(props.data.event_date)}</p>
          <p className="mt-1 text-xs leading-5 text-gray-900">{props.data.creator.first_name} {props.data.creator.last_name}</p>
        </div>
        <div>
          <p className="mt-1 text-xs leading-5 text-gray-900 font-semibold">Where:</p>
          <p className="mt-1 text-xs leading-5 text-gray-900 font-semibold">City:</p>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="mt-1 text-xs leading-5 text-gray-900">{props.data.event_address} </p>
          <p className="mt-1 text-xs leading-5 text-gray-900">{props.data.city} </p>
          {props.location === "/volunteer" ?
            <button
              className="relative text-sm cursor-default">
              <div className="absolute inset-x-0 h-full -bottom-2 min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-500"></div>
              <div className="relative min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-400 text-white">
                Available</div>

            </button>

            // <button className=" text-sm min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-300 text-white" >
            //   Available
            // </button>
            :
            props.data.creator.id === props.loggedIn.id ? (
              <button
                className="relative text-sm cursor-default">
                <div className="absolute inset-x-0 h-full -bottom-2 min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-500"></div>
                <div className="relative min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-400 text-white">
                  My Event</div>

              </button>
              // <button className="min-w-40 text-sm mt-1 px-2 py-1 rounded-full bg-sky-400 text-white">
              //   My Event
              // </button>
            ) : (

              <button
                className="relative text-sm cursor-default">
                <div className="absolute inset-x-0 h-full -bottom-2 min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-500"></div>
                <div className="relative min-w-40 mt-1 px-2 py-1 rounded-full bg-sky-400 text-white">
                  Volunteering</div>

              </button>
              // <button className="min-w-40 text-sm mt-1 px-2 py-1 rounded-full bg-sky-300 text-white">
              //   Volunteering
              // </button>
            )
          }
        </div>
      </div>
    </li>
  );
}

export default MyEvents;

