import React from 'react';
import './style/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DocumentPage from './components/DocumentPage.js';
import Doc from './components/Doc.js';


function PannDF() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DocumentPage} />
        <Route exact path="/pdf" component={Doc} />
        <Route path="/" render={() => <div>404</div>} />
      </Switch>
    </Router>
  );
}

export default PannDF;