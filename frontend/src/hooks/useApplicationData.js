import { useReducer, useEffect } from 'react';

export const ACTIONS = {
  SET_EVENTS_DATA: 'SET_EVENTS_DATA',
  SET_LOGGED_IN: 'SET_LOGGED_IN'
};

const useApplicationData = () => {

  const initialState = {
    eventsData: [],
    loggedIn: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => dispatch({ type: ACTIONS.SET_EVENTS_DATA, payload: data }));
  }, []);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => dispatch({ type: ACTIONS.SET_LOGGED_IN, payload: data }));
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_EVENTS_DATA:
        return { ...state, eventsData: action.payload }; 
      case ACTIONS.SET_LOGGED_IN:
        return {...state, loggedIn: action.payload};
    }
  }



const setLoggedIn = function(ID) {
    fetch(`api/users/${ID}`)
      .then(res => res.json())
      .then(data => dispatch({ type: ACTIONS.SET_LOGGED_IN, payload: data }));
  };

  function addUserToEvent(userId, eventId) {
    fetch('api/eventuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId }),
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting event from user:', error);
        alert('Failed to add user to event. Please try again.');
    });
}

function deleteEventFromUser(userId, eventId) {


    fetch('api/eventuser/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId }),
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert(data.message);
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error withdrawing from event:', error);
        alert('Failed to withdraw from event. Please try again.');
    });
}

  return {
    state,
    setLoggedIn,
    addUserToEvent,
    deleteEventFromUser
  };
};

export default useApplicationData;
