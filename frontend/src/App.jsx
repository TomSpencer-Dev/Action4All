import React from 'react';
import HomeRoute from 'routes/HomeRoute';
import './App.scss';
import useApplicationData from 'hooks/useApplicationData';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from 'components/Navigation';
import Register from 'components/Register';
import EventForm from 'components/EventForm';
import Opportunities from 'components/Opportunities'



// Note: Rendering a single component to build components in isolation
const App = () => {
const {
   state, setLoggedIn } = useApplicationData();

  return (
    <div className="App">
      <Router>
        <Navigation setLoggedIn={setLoggedIn} loggedIn={state.loggedIn} />
        <Routes>
          <Route path="*" element={<h4>404 Page not Found</h4>} />
          <Route path="/" element={<HomeRoute events={state.eventsData} setLoggedIn = {setLoggedIn} loggedIn = {state.loggedIn} />} />
          <Route path="/volunteer" element={<Opportunities />}/>
          <Route path="/create" element={<EventForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
