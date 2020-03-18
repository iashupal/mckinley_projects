import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from '../components/Loader';
import Loadable from 'react-loadable';

const Dashboard = Loadable({
  loader: () => import('../screens/Dashboard'),
  loading: Loader,
});

const Appointments = Loadable({
  loader: () => import('../screens/Appointments'),
  loading: Loader,
});

const Patients = Loadable({
  loader: () => import('../screens/Patients'),
  loading: Loader,
});

const Doctors = Loadable({
  loader: () => import('../screens/Doctors'),
  loading: Loader,
});

function AppRouter() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/patients" exact component={Patients} />
      <Route path="/doctors" exact component={Doctors} />
      <Route path="/appointments" exact component={Appointments} />
    </Switch>
  );
}

export default AppRouter;
