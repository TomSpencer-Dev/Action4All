import { useReducer, useEffect } from 'react';


export const ACTIONS = {
  SET_EVENTS_DATA: 'SET_EVENTS_DATA',
  SET_LOGGED_IN: 'SET_LOGGED_IN'
};

const useApplicationData = () => {

  const initialState = {
    eventsData: [],
    loggedIn: {},
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

  return {
    state,
    setLoggedIn
  };
};

export default useApplicationData;
