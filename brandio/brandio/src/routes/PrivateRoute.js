import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, authed, path, ...rest }) {
    console.log(rest);
    return (
        <Route
            exact
            render={props =>
                authed === true ? (
                    <Component {...props} {...rest} />
                ) : (
                    (window.location.href = `http://devmy.collartt.com/auth/loginform?ref=https://brandio.collartt.com${path}`)
                )
            }
        />
    );
}

export default PrivateRoute;
