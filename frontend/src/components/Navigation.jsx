import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';
import { handleSignoutClick } from 'helper/calendar';

function Navigation(props) {
  const userEmail = props.loggedIn.email
  const user_id = Cookies.get('user_id');
  const isLoggedIn = Cookies.get('isLoggedIn');

  const handleLogout = () => {

    Cookies.remove('user_id');
    Cookies.remove('isLoggedIn');

    props.setLoggedIn(null, null);
    handleSignoutClick()
  };
  
  

  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-400 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <img className="png" src={icon} alt="icon" title="icon" />
        </Link>
        <span className="font-semibold text-xl tracking-tight">Action4All</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-100 mr-4">
            Home
          </Link>
          <>
            <Link to="/volunteer" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-100 mr-4">
              Volunteer
            </Link>
            <Link to="/create" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-100">
              Create Event
            </Link>
          </>
        </div>
        <div>
          {isLoggedIn ? (
            <div>
              <span className="text-white mr-3">{userEmail}</span>
              <button
                className="bg-sky-400 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          ) : (
            <Link
              to="/register"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;



