import React from "react";
import { Switch, Route, BrowserRouter, withRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { Routes } from "./RoutesList";
import MainLayout from "../Layout/MainLayout";
import Loader from "../screens/Loader";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../screens/NotFound";
import MainEditor from "../components/Editor";
import InEditor from "../screens/InEditor";
import Withdrawal from "../screens/Withdrawal";

const ProductDetails = Loadable({
    loader: () => import("../screens/ProductDetails"),
    loading: Loader
});

const FandioBrandMallList = Loadable({
    loader: () => import("../screens/FandioBrandMallList"),
    loading: Loader
});

const BrandioBrandList = Loadable({
    loader: () => import("../screens/BrandioBrandList"),
    loading: Loader
});

const BrandioCollaborationList = Loadable({
    loader: () => import("../screens/BrandioCollaborationList"),
    loading: Loader
});

const BrandCreate = Loadable({
    loader: () => import("../screens/BrandCreate"),
    loading: Loader
});
const BrandioArtistList = Loadable({
    loader: () => import("../screens/BrandioArtistList"),
    loading: Loader
});
const BrandioCollaborationCardInside = Loadable({
    loader: () => import("../screens/BrandioCollaborationCardInside"),
    loading: Loader
});
const BrandioProductCreate = Loadable({
    loader: () => import("../screens/BrandioProductCreate"),
    loading: Loader
});
const BrandioProductCreateTwo = Loadable({
    loader: () => import("../screens/BrandioProductCreateTwo"),
    loading: Loader
});
const BrandioIllustrationUpload = Loadable({
    loader: () => import("../screens/BrandioIllustrationUpload"),
    loading: Loader
});
const Editor = Loadable({
    loader: () => import("../screens/Editor"),
    loading: Loader
});
const CardAcceptReject = Loadable({
    loader: () => import("../screens/CardAcceptReject"),
    loading: Loader
});
const Mybrands = Loadable({
    loader: () => import("../screens/BrandioMyBrands"),
    loading: Loader
});
const Home = Loadable({
    loader: () => import("../screens/Home"),
    loading: Loader
});

function AppRoutes({ isLogin }) {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                <Route exact path="/" component={Home} />
                <Route
                    exact
                    path="/product/:productID"
                    component={ProductDetails}
                />
                <Route
                    exact
                    path="/brandmall/:id"
                    component={FandioBrandMallList}
                />
                <Route exact path="/brands" component={BrandioBrandList} />
                <PrivateRoute
                    exact
                    authed={!!isLogin}
                    path="/collaboration"
                    component={BrandioCollaborationList}
                />
                <Route exact path="/artists" component={BrandioArtistList} />
                <PrivateRoute
                    authed={!!isLogin}
                    path="/brands/new"
                    component={BrandCreate}
                />
                <PrivateRoute
                    exact
                    path="/collaboration/:id"
                    authed={!!isLogin}
                    component={BrandioCollaborationCardInside}
                />
                <PrivateRoute
                    authed={!!isLogin}
                    path="/products/new"
                    component={BrandioProductCreate}
                />
                <Route
                    exact
                    path="/brandioproductcreatetwo"
                    component={BrandioProductCreateTwo}
                />
                <PrivateRoute
                    authed={!!isLogin}
                    path="/illustrations/new"
                    component={BrandioIllustrationUpload}
                />

                <PrivateRoute
                    authed={!!isLogin}
                    path="/editor"
                    component={Editor}
                />
                <PrivateRoute
                    exact
                    authed={!!isLogin}
                    path="/collaboration-request/:reqId"
                    component={CardAcceptReject}
                />
                <PrivateRoute
                    exact
                    authed={!!isLogin}
                    path="/myinfo/:option"
                    component={Mybrands}
                />
                <PrivateRoute
                    exact
                    authed={!!isLogin}
                    path="/withdrawal"
                    component={Withdrawal}
                />
                <Route
                    exact
                    path="/main-editor/:itemId/:mode"
                    component={InEditor}
                />

                {Routes.map((route, index) => {
                    return (
                        <Route
                            key={`mainRoute-${index}`}
                            exact={route.exact}
                            path={route.path}
                            component={() => {
                                const RouteComponent = withRouter(
                                    withRouterProps => (
                                        <MainLayout {...withRouterProps}>
                                            <route.Component
                                                {...withRouterProps}
                                            />
                                        </MainLayout>
                                    )
                                );
                                return <RouteComponent />;
                            }}
                        />
                    );
                })}
                <Route component={NotFound} />

                {/* <Route component={NotFound} /> */}
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;
