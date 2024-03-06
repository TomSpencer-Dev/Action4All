import React from 'react';

import HomeRoute from 'routes/HomeRoute';
import './App.scss';
import useApplicationData from 'hooks/useApplicationData';


// Note: Rendering a single component to build components in isolation
const App = () => {
const {
   state, setLoggedIn } = useApplicationData();

  return (
    <div className="App">
      <HomeRoute events={state.eventsData} setLoggedIn = {setLoggedIn} loggedIn = {state.loggedIn} />
    </div>
  );
};

export default App;
