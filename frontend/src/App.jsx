import React from 'react';
import HomeRoute from 'routes/HomeRoute';
import './App.scss';
import useApplicationData from 'hooks/useApplicationData';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from 'components/Navigation';
import Register from 'components/Register';
import EventForm from 'components/EventForm';
import Opportunities from 'components/Opportunities'
import Calendar from 'components/Calendar';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
const {
   state, deleteEvent,setLocation, logout, setLoggedIn, addUserToEvent, deleteEventFromUser } = useApplicationData();
   const isLoggedIn = Cookies.get('isLoggedIn') ;

  return (
    <div className="App">
      <Router>
        <Navigation setLoggedIn={setLoggedIn} loggedIn={state.loggedIn} setLocation = {setLocation} location={state.location} logout = {logout}/>
         <Routes>
          <Route path="*" element={<h4>404 Page not Found</h4>} />
          <Route path="/" element={<HomeRoute events={state.eventsData} setLoggedIn = {setLoggedIn} loggedIn = {state.loggedIn} addUserToEvent = {addUserToEvent} deleteEventFromUser={deleteEventFromUser} setLocation = {setLocation} location = {state.location} deleteEvent = {deleteEvent}/>} />
          <Route path="/volunteer" element={!isLoggedIn? ( <Navigate replace to={"/"} /> ) : (<Opportunities events={state.eventsData} setLoggedIn = {setLoggedIn} loggedIn = {state.loggedIn} addUserToEvent = {addUserToEvent} deleteEventFromUser={deleteEventFromUser} setLocation = {setLocation} location = {state.location} />)}/>
          <Route path="/create" element={isLoggedIn?(<EventForm loggedIn = {state.loggedIn} />):( <Navigate replace to={"/"} /> )} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
};

export default App;
