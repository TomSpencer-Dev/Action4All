import { useReducer, useEffect } from 'react';


export const ACTIONS = {
  SET_EVENTS_DATA: 'SET_EVENTS_DATA'
};

const useApplicationData = () => {

  const initialState = {
    eventsData: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => dispatch({ type: ACTIONS.SET_EVENTS_DATA, payload: data }));
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_EVENTS_DATA:
        return { ...state, eventsData: action.payload }; 
    }
  }

  return {
    state
  };
};

export default useApplicationData;
