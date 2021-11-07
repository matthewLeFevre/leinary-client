import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Project from "../pages/project/Project";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/project/:projectId/page/:pageId'>
          <Project />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
