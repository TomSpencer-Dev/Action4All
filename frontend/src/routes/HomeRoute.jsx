import React from 'react';

import '../styles/HomeRoute.scss';
import Navigation from 'components/Navigation';
import Events from 'components/Events';
import Login from 'components/Login'
import Register from 'components/Register';
import EventForm from 'components/EventForm';


const HomeRoute = (props) => {
  return (
    <div className="home-route">
      <Navigation setLoggedIn = {props.setLoggedIn} loggedIn = {props.loggedIn} />
      <Events events = {props.events} />
      <Login/>
      <Register/>
      <EventForm/>
    </div>
  );
};

export default HomeRoute;
