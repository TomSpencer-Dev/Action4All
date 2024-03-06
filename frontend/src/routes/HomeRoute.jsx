import React from 'react';

import '../styles/HomeRoute.scss';
import Navigation from 'components/Navigation';
import Events from 'components/Events';

const HomeRoute = (props) => {

  return (
    <div className="home-route">
      <Navigation />
      <Events events = {props.events} />
    </div>
  );
};

export default HomeRoute;
