import React from "react";
import { withCookies, useCookies } from "react-cookie";
import AppRoutes from "./routes/AppRoutes";

import "./components/Navbar/HamburgerMenu.css";
import "./App.css";
import { HeaderProvider } from "./context/HeaderContext";

function App(props) {
  const [cookies, setCookie] = useCookies(["is_login"]);
  return (
    <HeaderProvider>
      <AppRoutes isLogin={cookies.is_login} />
    </HeaderProvider>
  );
}

export default withCookies(App);
