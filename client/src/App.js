import React from 'react';
import {UseRouts} from './routs'
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
    const routs = UseRouts(false);
  return (
      <Router>
        <div>
            {routs}
        </div>
      </Router>
  );
}

export default App;
