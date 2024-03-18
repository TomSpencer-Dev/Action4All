import React from 'react';

import '../styles/HomeRoute.scss';

import Events from 'components/Events';
import Login from 'components/Login';
import Cookies from 'js-cookie';


const HomeRoute = (props) => {
 
  const isLoggedIn = Cookies.get('isLoggedIn') ;
  


  return (
    <div>
      {isLoggedIn ? (
        <div className="home-route">
          <Events events = {props.events}  />
        </div>
      ) : (
        <div className="home-route">
          <Login setLoggedIn = {props.setLoggedIn} loggedIn = {props.loggedIn } />
         
          
          
        </div>
  )
      }   
     </div>
  )
 };

export default HomeRoute;





// export default HomeRoute;



