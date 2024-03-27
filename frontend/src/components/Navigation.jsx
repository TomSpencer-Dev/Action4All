import React from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import icon from '../assets/icon.png';
import { handleSignoutClick } from 'helper/calendar';
import 'animate.css';
import BeatingHeartIcon from './BeatingHeartIcon';

function Navigation(props) {
  const userEmail = props.loggedIn.email;
  const user_id = Cookies.get('user_id');
  const isLoggedIn = Cookies.get('isLoggedIn');

  const handleLogout = () => {
    Cookies.remove('user_id');
    Cookies.remove('isLoggedIn');
    props.logout(null, null);
    handleSignoutClick();
  };

  return (
    <nav className={`flex fixed items-center w-full justify-between flex-wrap p-6 z-10 ${isLoggedIn ? 'bg-sky-400' : 'bg-transparent'}`}>

      <div className="flex items-center flex-shrink-0 text-white mr-6 animate__animated animate__bounceInDown animate__delay-1s">
        <Link to="/" >
          <img className="png" src={icon} alt="icon" title="icon" />
        </Link>
        <span className="font-semibold text-xl tracking-tight">Action4All</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-100 mr-4">
            Home
          </Link> */}
          <Link
            to="/"
            className="relative text-sm lg:inline-block animate__animated animate__bounceInDown animate__delay-2s">
            <div className={`absolute inset-x-0 h-full -bottom-2 border rounded mr-4 ${isLoggedIn ? 'bg-sky-500 border-sky-500 ' : 'bg-sky-300 border-sky-300'}`}></div>
            <div className="relative bg-sky-400 border rounded px-4 py-2 transition transform active:translate-y-2 text-white mr-4 hover:bg-sky-300">Home</div>
          </Link>
          <>
            <Link
              to="/volunteer"
              className="relative text-sm lg:inline-block animate__animated animate__bounceInDown animate__delay-3s">
              <div className={`absolute inset-x-0 h-full -bottom-2 border rounded mr-4 ${isLoggedIn ? 'bg-sky-500 border-sky-500 ' : 'bg-sky-300 border-sky-300'}`}></div>
              <div className="relative bg-sky-400 border rounded px-4 py-2 transition transform active:translate-y-2 text-white mr-4 hover:bg-sky-300">Volunteer</div>
            </Link>
            {/* <Link to="/volunteer" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-100 mr-4">
              Volunteer
            </Link> */}
            {/* <Link to="/create" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-sky-100">
              Create Event
            </Link> */}
            <Link
              to="/create"
              className="relative text-sm lg:inline-block animate__animated animate__bounceInDown animate__delay-4s">
              <div className={`absolute inset-x-0 h-full -bottom-2 border rounded mr-4 ${isLoggedIn ? 'bg-sky-500 border-sky-500 ' : 'bg-sky-300 border-sky-300'}`}></div>
              <div className="relative bg-sky-400 border rounded px-4 py-2 transition transform active:translate-y-2 text-white mr-4 hover:bg-sky-300">Create Event</div>
            </Link>
          </>
        </div>
        <div>
          {isLoggedIn ? (

            <div className="animate__animated animate__fadeInRight" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <BeatingHeartIcon />
                <span className="text-white mr-3">{userEmail}</span>
              </div>
              <button
                className="relative text-sm lg:inline-block" type="button"
                onClick={handleLogout}>
                <div className="absolute inset-x-0 h-full -bottom-2 bg-sky-500 border border-sky-500 rounded mr-4"></div>
                <div className="relative bg-sky-400 border rounded px-4 py-2 transition transform active:translate-y-2 text-white mr-4 hover:bg-sky-300"
                >Logout</div>
              </button>
              {/* <button
                className="bg-sky-400 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button> */}

            </div>
          ) : (
            // <Link
            //   to="/register"
            //   className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-sky-500 hover:bg-white mt-4 lg:mt-0"
            // >
            //   Register
            // </Link>
            <div className="animate__animated animate__bounceInDown animate__delay-5s">
              <Link
                to="/register"
                className="relative text-sm">
                <div className={`absolute inset-x-0 h-full -bottom-2 border rounded ${isLoggedIn ? 'bg-sky-500 border-sky-500 ' : 'bg-sky-300 border-sky-300'}`}></div>
                <div className="relative bg-sky-400 border rounded px-4 py-2 transition transform active:translate-y-2 text-white hover:bg-sky-300">Register</div>
              </Link></div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;



