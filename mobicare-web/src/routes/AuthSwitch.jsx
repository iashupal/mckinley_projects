import React from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../components/Loader";

const SignIn = Loadable({
  loader: () => import("../screens/SignIn"),
  loading: Loader
});

const SignUp = Loadable({
  loader: () => import("../screens/SignUp"),
  loading: Loader
});

const ForgotPassword = Loadable({
  loader: () => import("../screens/ForgotPassword"),
  loading: Loader
});

const ResetPassword = Loadable({
  loader: () => import("../screens/ResetPassword"),
  loading: Loader
});

export default function AuthSwitch() {
  return (
    <Switch>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/forgot" exact component={ForgotPassword} />
      <Route path="/reset/:email/:token" exact component={ResetPassword} />
      <Route path="/" component={SignIn} />
    </Switch>
  );
}
