import Login from "components/authen/Login";
import Rigister from "components/authen/Rigister";
import Account from "components/account/Account";
import Dashboard from "components/dashboard/Dashboard";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "../hooks/use-auth";
import PrivateRoute from "./PrivateRoute";


export default function MainRouter() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Rigister />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}
