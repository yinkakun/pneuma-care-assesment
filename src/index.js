import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './homepage';
import Character from './character';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/character/:character" component={Character} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
