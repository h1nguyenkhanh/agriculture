import Login from 'components/authen/Login';
import Rigister from 'components/authen/Rigister';
import Account from 'components/account/Account';
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
          <Route exact path="/register">
            <Rigister/>
          </Route>
          <Route exact path="/account">
            <Account/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
    </Router>
  );
}
