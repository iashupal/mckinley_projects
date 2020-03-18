import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { Skeleton } from "antd";

const SignIn = Loadable({
  loader: () => import("../pages/Auth/SignIn"),
  loading: Skeleton
});

const SignUp = Loadable({
  loader: () => import("../pages/Auth/SignUp"),
  loading: Skeleton
});

function AuthRoutes() {
  return (
    <Switch>
      <Route path='/register' exact component={SignUp} />
      <Route path='/' component={SignIn} />
    </Switch>
  );
}

export default AuthRoutes;
