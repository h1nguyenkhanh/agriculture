import Login from 'components/authen/Login';
import Dashboard from 'components/dashboard/Dashboard';
import React from "react";
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";

export default function MainRouter() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </Router>
  );
}
