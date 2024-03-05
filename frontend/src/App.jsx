import React from 'react';

import './App.scss';
import Navigation from 'components/Navigation';


// Note: Rendering a single component to build components in isolation
const App = () => {
  return (
    <div className="App">
      <Navigation />
    </div>
  );
};

export default App;
