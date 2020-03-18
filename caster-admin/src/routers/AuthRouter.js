import React from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "../components/Loader";
import Loadable from "react-loadable";

const Login = Loadable({
  loader: () => import("../screens/LogIn"),
  loading: Loader
});

const ResetPassword = Loadable({
  loader: () => import("../screens/ResetPassword"),
  loading: Loader
});

function AuthRouter() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/reset-password" exact component={ResetPassword} />
    </Switch>
  );
}

export default AuthRouter;
