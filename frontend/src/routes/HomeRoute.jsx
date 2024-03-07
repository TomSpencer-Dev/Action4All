import React from 'react';

import '../styles/HomeRoute.scss';
import Navigation from 'components/Navigation';
import Events from 'components/Events';
import Login from 'components/Login';
import Register from 'components/Register';
import EventForm from 'components/EventForm';


const HomeRoute = (props) => {
  
const isLoggedIn = props.loggedIn.email
  return (
    <div>
      {isLoggedIn ? (
        <div className="home-route">
          <Navigation setLoggedIn={props.setLoggedIn} loggedIn={props.loggedIn} />
          <Events events={props.events} />
        </div>
      ) : (
        <div className="home-route">
          <Navigation setLoggedIn={props.setLoggedIn} loggedIn={props.loggedIn} />
          <Login />
        </div>
      )}
    </div>
  );
};

export default HomeRoute;
