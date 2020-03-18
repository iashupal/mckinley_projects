import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from '../components/Loader';
import Loadable from 'react-loadable';

const Dashboard = Loadable({
  loader: () => import('../screens/Dashboard'),
  loading: Loader,
});

const UserList = Loadable({
  loader: () => import('../screens/UserList'),
  loading: Loader,
});
const UserDetail = Loadable({
  loader: () => import('../screens/UserDetail'),
  loading: Loader,
});
const Cast = Loadable({
  loader: () => import('../screens/Cast'),
  loading: Loader,
});
const AddCast = Loadable({
  loader: () => import('../screens/AddCast'),
  loading: Loader,
});
const CastCard = Loadable({
  loader: () => import('../screens/CastCard'),
  loading: Loader,
});
const Comment = Loadable({
  loader: () => import('../screens/Comment'),
  loading: Loader,
});
const Banner = Loadable({
  loader: () => import('../screens/Banner'),
  loading: Loader,
});
const Announcements = Loadable({
  loader: () => import('../screens/Announcements'),
  loading: Loader,
});
const FAQ = Loadable({
  loader: () => import('../screens/FAQ'),
  loading: Loader,
});
const Reward = Loadable({
  loader: () => import('../screens/Reward'),
  loading: Loader,
});

function AppRouter() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/users" exact component={UserList} />
      <Route exact path="/membership/:userID" component={UserDetail} />
      <Route path="/announcements" exact component={Announcements} />
      <Route path="/faq" exact component={FAQ} />
      <Route path="/cast" exact component={Cast} />
      <Route path="/cast/add" exact component={AddCast} />
      <Route path="/cast/edit" exact component={AddCast} />
      <Route path="/comment" exact component={Comment} />
      <Route path="/banner" exact component={Banner} />
      <Route path="/reward" exact component={Reward} />
      <Route path="/cast-card" exact component={CastCard} />
    </Switch>
  );
}

export default AppRouter;
