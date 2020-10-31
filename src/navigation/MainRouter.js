import Dashboard from 'components/dashboard/Dashboard';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export default function MainRouter() {
  return (
    <Router>
        <Dashboard />
    </Router>
  );
}
