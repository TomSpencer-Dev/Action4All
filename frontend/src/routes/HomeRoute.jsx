import React from 'react';

import '../styles/HomeRoute.scss';

import Events from 'components/Events';
import Login from 'components/Login';
import Cookies from 'js-cookie';


const HomeRoute = (props) => {
 
  const isLoggedIn = Cookies.get('isLoggedIn') ;

  return (
    <>
        { isLoggedIn ? 
        <div className="home-route">
          <Events events = {props.events} addUserToEvent = {props.addUserToEvent} deleteEventFromUser = {props.deleteEventFromUser} loggedIn = {props.loggedIn} />
        </div>
       : 
        <div className="home-route">
          <Login setLoggedIn = {props.setLoggedIn} loggedIn = {props.loggedIn } />
         
          
          
        </div>
        
        }
     </>
  )
 };

export default HomeRoute;








