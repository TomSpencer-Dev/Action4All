import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { toast } from 'react-toastify';

const now = moment();

function EventForm(props) {
    const [eventFormData, setEventFormData] = useState({
        event_name: '',
        event_date: new Date(),
        event_details: '',
        start_time: moment('00:00:00', 'HH:mm:ss'),
        end_time: moment('00:00:00', 'HH:mm:ss'),
        event_status: 'INCOMPLETE',
        event_address: '',
        city: '',
        postal: '',
        creator_id: '',
    });

    function updateField({ field, value }) {
        if (field === 'event_date') {
            if (moment(value, 'MMM DD, YYYY', true).isValid()) {
                const date = moment(value.toISOString());
                const startTime = date.clone().startOf('day').set({ hour: 0, minute: 0, second: 0 });
                const endTime = date.clone().startOf('day').set({ hour: 23, minute: 59, second: 59 });

                setEventFormData({
                    ...eventFormData,
                    [field]: date,
                    start_time: startTime,
                    end_time: endTime,
                });
            } else {
                console.error(`Invalid event date: ${value}`);
            }


        } else if (field === 'start_time' || field === 'end_time') {
            const time = moment(value, 'HH:mm:ss');

            if (time.isValid()) {
                setEventFormData({
                    ...eventFormData,
                    [field]: time,
                });
            }

        } else {
            setEventFormData({
                ...eventFormData,
                [field]: value,
            });
        }
    }

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8001/api/events');
            const data = await response.json();
            setEventFormData(data[data.length - 1]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function createEvent(eventData) {
      const userId = props.loggedIn.id
        try {
            const response = await fetch(`/api/events/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Error during creation:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createEvent({
                ...eventFormData,
                start_time: eventFormData.start_time.format('HH:mm:ss'),
                end_time: eventFormData.end_time.format('HH:mm:ss'),
            });
            toast.success("Event created successfully!", {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 1000,
            closeOnClick: true
          });
            console.log('Event created successfully');

            // Reset form data after successful submission
            setEventFormData({
                event_name: '',
                event_date: '',
                event_details: '',
                start_time: moment('00:00:00', 'HH:mm:ss'),
                end_time: moment('00:00:00', 'HH:mm:ss'),
                event_status: 'INCOMPLETE',
                event_address: '',
                city: '',
                postal: '',
            });

        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="flex items-center justify-center pt-40">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-event_name">
                            Event Name
                        </label>
                        <input
                            id="grid-event_name"
                            type="text"
                            placeholder="Street Cleanup"
                            value={eventFormData.event_name}
                            onChange={event => updateField({ field: "event_name", value: event.target.value })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Event Date
                        </label>
                        <DatePicker
                            id="grid-event_date"
                            selected={eventFormData.event_date}
                            onChange={(date) => updateField({ field: "event_date", value: date.toISOString() })}
                            dateFormat="MMM dd, yyyy"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        />
                        <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-start_time">
                            Event Start Time
                        </label>
                        <TimePicker
                            className="rc-time-picker"
                            format="h:mm a"
                            value={eventFormData.start_time}
                            onChange={(value) => updateField({ field: 'start_time', value })}
                            use12Hours
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-end_time">
                            Event End Time
                        </label>
                        <TimePicker
                            className="rc-time-picker"
                            format="h:mm a"
                            value={eventFormData.end_time}
                            onChange={(value) => updateField({ field: 'end_time', value })}
                            use12Hours
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-event_details">
                            Event Details
                        </label>
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
                            Postal Code
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-postal"
                            type="text"
                            placeholder="V3N 2A2"
                            value={eventFormData.postal}
                            onChange={(event) => updateField({ field: "postal", value: event.target.value })} />
                    </div>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EventForm;