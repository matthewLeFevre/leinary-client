import React from "react";
import { Route } from "react-router";

export default function PrivateRoute({ children, path }) {
  return <Route path={path}>{children}</Route>;
}
