import React from 'react';
import HomeRoute from 'routes/HomeRoute';
import './App.scss';
import useApplicationData from 'hooks/useApplicationData';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from 'components/Navigation';
import Register from 'components/Register';
import EventForm from 'components/EventForm';
import Opportunities from 'components/Opportunities';
import Cookies from 'js-cookie';

const App = () => {
  const { state, setLoggedIn } = useApplicationData();
  const isLoggedIn = Cookies.get('isLoggedIn');

  return (
    <div className="App">
      <Router>
        <Navigation setLoggedIn={setLoggedIn} loggedIn={state.loggedIn} />
        <Routes>
          <Route path="*" element={<h4>404 Page not Found</h4>} />
          <Route path="/" element={<HomeRoute events={state.eventsData} setLoggedIn={setLoggedIn} loggedIn={state.loggedIn} />} />
          <Route path="/volunteer" element={!isLoggedIn ? (<Navigate replace to={"/"} />) : (<Opportunities />)} />
          <Route path="/create" element={isLoggedIn ? (<EventForm />) : (<Navigate replace to={"/"} />)} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
