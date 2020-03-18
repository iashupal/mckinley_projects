import React from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "../components/Loader";
import Loadable from "react-loadable";

const Dashboard = Loadable({
  loader: () => import("../screens/Dashboard"),
  loading: Loader
});

const UserList = Loadable({
  loader: () => import("../screens/UserList"),
  loading: Loader
});

const Moments = Loadable({
  loader: () => import("../screens/Moments"),
  loading: Loader
});

const Vibes = Loadable({
  loader: () => import("../screens/Vibes"),
  loading: Loader
});

const SponsoredEvents = Loadable({
  loader: () => import("../screens/SponsoredEvents"),
  loading: Loader
});

const NonSponsoredEvents = Loadable({
  loader: () => import("../screens/NonSponsoredEvents"),
  loading: Loader
});
const VerifyOccupation = Loadable({
  loader: () => import("../screens/VerifyOccupation"),
  loading: Loader
});
const VerifyUniversity = Loadable({
  loader: () => import("../screens/VerifyUniversity"),
  loading: Loader
});
const VerifyFace = Loadable({
  loader: () => import("../screens/VerifyFace"),
  loading: Loader
});
const OutlierBlackVerification = Loadable({
  loader: () => import("../screens/OutlierBlackVerification"),
  loading: Loader
});
const CoffeeCoupon = Loadable({
  loader: () => import("../screens/CoffeeCoupon"),
  loading: Loader
});
const Purchase = Loadable({
  loader: () => import("../screens/Purchase"),
  loading: Loader
});
const DonationHashTag = Loadable({
  loader: () => import("../screens/DonationHashTag"),
  loading: Loader
});

const ReportManagement = Loadable({
  loader: () => import("../screens/ReportManagement"),
  loading: Loader
});
const RegisteredUsers = Loadable({
  loader: () => import("../screens/RegisteredUsers"),
  loading: Loader
});
const CouponRequest = Loadable({
  loader: () => import("../screens/CouponRequest"),
  loading: Loader
});
const ApproveImageDelete = Loadable({
  loader: () => import("../screens/ApproveImageDelete"),
  loading: Loader
});
const ApproveProfileImage = Loadable({
  loader: () => import("../screens/ApproveProfileImage"),
  loading: Loader
});
const ResolveRequest = Loadable({
  loader: () => import("../screens/ResolveRequest"),
  loading: Loader
});
const ShowDeletePost = Loadable({
  loader: () => import("../screens/ShowDeletePost"),
  loading: Loader
});
const UserRating = Loadable({
  loader: () => import("../screens/UserRating"),
  loading: Loader
});
const TotalEvents = Loadable({
  loader: () => import("../screens/TotalEvents"),
  loading: Loader
});
const ParticipatedEvent = Loadable({
  loader: () => import("../screens/ParticipatedEvent"),
  loading: Loader
});
function AppRouter() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/userlist" component={UserList} />
      <Route path="/registered-user" component={RegisteredUsers} />
      <Route path="/moments" component={Moments} />
      <Route path="/vibes" component={Vibes} />
      <Route path="/sponsored-events" component={SponsoredEvents} />
      <Route path="/events" component={TotalEvents} />
      <Route path="/participated-events" component={ParticipatedEvent} />
      <Route path="/non-sponsored-events" component={NonSponsoredEvents} />
      <Route path="/verifyOccupation" component={VerifyOccupation} />
      <Route path="/verifyUniversity" component={VerifyUniversity} />
      <Route path="/verifyFace" component={VerifyFace} />
      <Route path="/nationalVerification" component={OutlierBlackVerification} />
      <Route path="/coffee-coupon" component={CoffeeCoupon} />
      <Route path="/clover-purchase" component={Purchase} />
      <Route path="/donation-hashtag" component={DonationHashTag} />
      <Route path="/report" component={ReportManagement} />
      <Route path="/coupon-request" component={CouponRequest} />
      <Route path="/approve-image" component={ApproveImageDelete} />
      <Route path="/approve-profile" component={ApproveProfileImage} />
      <Route path="/resolve-request" component={ResolveRequest} />
      <Route path="/delete-post" component={ShowDeletePost} />
      <Route path="/user-rating" component={UserRating} />
    </Switch>
  );
}

export default AppRouter;
