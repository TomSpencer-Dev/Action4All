import React from 'react';
import '../styles/HomeRoute.scss';
import Events from 'components/Events';
import Login from 'components/Login';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import backgroundVideo from '../assets/backgroundVideo2.mp4';


const HomeRoute = (props) => {
  const isLoggedIn = Cookies.get('isLoggedIn');
  return (
    <>
      {isLoggedIn ?
        <div className="home-route">
          <Events
            events={props.events}
            addUserToEvent={props.addUserToEvent}
            deleteEventFromUser={props.deleteEventFromUser}
            loggedIn={props.loggedIn}
            setLocation={props.setLocation}
            location={props.location}
            deleteEvent={props.deleteEvent} />
        </div>
        :
        <div className="home-route" style={{position: 'relative'}}>

          <Login setLoggedIn={props.setLoggedIn} loggedIn={props.loggedIn} />
          <div className="video-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <video autoPlay loop muted className='video' style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={backgroundVideo} type='video/mp4'/>
            </video>
          </div>
        </div>

      }
    </>
  );
};

export default HomeRoute;


