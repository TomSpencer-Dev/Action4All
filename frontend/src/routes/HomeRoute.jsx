import React from 'react';

import '../styles/HomeRoute.scss';

import Events from 'components/Events';
import Login from 'components/Login';



const HomeRoute = (props) => {
  
const isLoggedIn = props.loggedIn.email
  return (
    <div>
      {isLoggedIn ? (
        <div className="home-route">
          <Events events = {[]}  />
        </div>
      ) : (
        <div className="home-route">
          <Login setLoggedIn = {props.setLoggedIn} />
        </div>
      )}
    </div>
  );
};

export default HomeRoute;
