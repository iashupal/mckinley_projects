import React from "react";
import { Skeleton } from "antd";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

const Articles = Loadable({
  loader: () => import("../pages/Articles/Articles"),
  loading: Skeleton
});

const ArticleDetails = Loadable({
  loader: () => import("../pages/Articles/ArticleDetails"),
  loading: Skeleton
});

const ArticleForm = Loadable({
  loader: () => import("../pages/Articles/ArticleForm"),
  loading: Skeleton
});

const UserList = Loadable({
  loader: () => import("../pages/NewUsers/UserList"),
  loading: Skeleton
});

const Profile = Loadable({
  loader: () => import("../pages/Profile/Profile"),
  loading: Skeleton
});

const NotFound = Loadable({
  loader: () => import("../pages/NotFound/NotFound"),
  loading: Skeleton
});

function AppRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/article/:articleID" component={ArticleDetails} />
      <Route exact path="/add" component={ArticleForm} />
      <Route exact path="/edit/:articleID" component={ArticleForm} />
      <Route exact path="/users/userlist" component={UserList} />
      <Route exact path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRoutes;
