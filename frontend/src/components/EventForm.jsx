import React, { useState } from 'react';

function EventForm() {
  const [eventFormData, setEventFormData] = useState({
    event_name: '',
    event_date: '',
    event_details: '',
    start_time: '',
    end_time: '',
    event_hours: 0,
    event_status: 'INCOMPLETE',
    event_address: '',
    city: '',
    postal: '',
    creator_id: '',
  });

  //console.log("eventFormDate", eventFormData)
  function updateField({ field, value }) {
    setEventFormData({ ...eventFormData, [field]: value });
  }
  async function createEvent(eventData) {
    try {
      const response = await fetch('http://localhost:8001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        window.location.href = '/'; // Redirect to login page
      } else {
        //console.log(response)
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error('Error during creation:', error);
    }
  };

  // const handleInputChange = (e) => {
  //   setEventFormData({
  //     ...eventFormData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEvent(eventFormData);
      console.log('Event created successfully');
      // Reset form data after successful submission
      setEventFormData({
        event_name: '',
        event_date: '',
        event_details: '',
        start_time: '',
        end_time: '',
        event_length: '',
        event_address: '',
        city: '',
        postal: ''
      });
      // Redirect or show a success message
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            Event Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-event_name"
            type="text"
            placeholder="Street Cleanup"
            value={eventFormData.event_name}
            onChange={event => updateField({ field: "event_name", value: event.target.value })} />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
            Event Date
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-event_date"
            type="text"
            placeholder="Jan 25, 2004"
            value={eventFormData.event_date}
            onChange={(event) => updateField({ field: "event_date", value: event.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            Event Start Time
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-start_time"
            type="text"
            placeholder="4pm"
            value={eventFormData.start_time}
            onChange={(event) => updateField({ field: "start_time", value: event.target.value })}
          />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>

        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            Event End Time
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-start_time"
            type="text"
            placeholder="6pm"
            value={eventFormData.end_time}
            onChange={(event) => updateField({ field: "end_time", value: event.target.value })}
          />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
            Event Length
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-event_length"
            type="text"
            placeholder="5 hours"
            value={eventFormData.event_length}
            onChange={(event) => updateField({ field: "event_length", value: event.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-event_details">
            Event Details
          </label>
          {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="text" placeholder="We are looking for someone to help pick up trash..." /> */}
          <textarea
            id="grid-event_details"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="We need help picking up garbage..."
            value={eventFormData.event_details}
            onChange={(event) => updateField({ field: "event_details", value: event.target.value })}
          ></textarea>
          <p className="text-gray-600 text-xs italic">Make it as long as you would like</p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
            Address
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="text"
            placeholder="24 Wall Street"
            value={eventFormData.event_address}
            onChange={(event) => updateField({ field: "event_address", value: event.target.value })} />
          <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
            City
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="Vancouver"
            value={eventFormData.city}
            onChange={(event) => updateField({ field: "city", value: event.target.value })} />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
            Province
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option>ON</option>
              <option>QC</option>
              <option>NS</option>
              <option>NB</option>
              <option>MB</option>
              <option>BC</option>
              <option>PEI</option>
              <option>SK</option>
              <option>AB</option>
              <option>NL</option>
              <option>NT</option>
              <option>YT</option>
              <option>NU</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
            Postal
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-postal"
            type="text"
            placeholder="V3N 2A2"
            value={eventFormData.postal}
            onChange={(event) => updateField({ field: "postal", value: event.target.value })} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleSubmit} >
          Submit
        </button>
      </div>
    </form>
  );
}

export default EventForm;