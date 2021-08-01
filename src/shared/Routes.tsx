import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Company from '../pages/company';
import Login from '../pages/login';

// TODO: create handle errors route/page
const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/:companyId">
        <Company />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
