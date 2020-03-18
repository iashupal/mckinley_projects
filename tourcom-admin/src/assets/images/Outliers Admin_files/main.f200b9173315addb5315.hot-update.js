webpackHotUpdate("main",{

/***/ "./src/routers/AppRouter.js":
/*!**********************************!*\
  !*** ./src/routers/AppRouter.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Loader */ "./src/components/Loader.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-loadable */ "./node_modules/react-loadable/lib/index.js");
/* harmony import */ var react_loadable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_loadable__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/ashu/projects/outliers-admin/src/routers/AppRouter.js";




const Dashboard = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(3), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, /*! ../screens/Dashboard */ "./src/screens/Dashboard.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const UserList = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! ../screens/UserList */ "./src/screens/UserList.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const Moments = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! ../screens/Moments */ "./src/screens/Moments.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const Vibes = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, /*! ../screens/Vibes */ "./src/screens/Vibes.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const SponsoredEvents = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! ../screens/SponsoredEvents */ "./src/screens/SponsoredEvents.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const NonSponsoredEvents = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, /*! ../screens/NonSponsoredEvents */ "./src/screens/NonSponsoredEvents.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const Verification = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, /*! ../screens/Verification */ "./src/screens/Verification.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const OutlierBlackVerification = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, /*! ../screens/OutlierBlackVerification */ "./src/screens/OutlierBlackVerification.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const CoffeeCoupon = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! ../screens/CoffeeCoupon */ "./src/screens/CoffeeCoupon.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const Purchase = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, /*! ../screens/Purchase */ "./src/screens/Purchase.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const DonationHashTag = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, /*! ../screens/DonationHashTag */ "./src/screens/DonationHashTag.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const ReportManagement = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(20)]).then(__webpack_require__.bind(null, /*! ../screens/ReportManagement */ "./src/screens/ReportManagement.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const RegisteredUsers = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(4), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, /*! ../screens/RegisteredUsers */ "./src/screens/RegisteredUsers.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});
const CouponRequest = react_loadable__WEBPACK_IMPORTED_MODULE_3___default()({
  loader: () => Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(18)]).then(__webpack_require__.bind(null, /*! ../screens/CouponRequest */ "./src/screens/CouponRequest.js")),
  loading: _components_Loader__WEBPACK_IMPORTED_MODULE_2__["default"]
});

function AppRouter() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/",
    exact: true,
    component: Dashboard,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/userlist",
    exact: true,
    component: UserList,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/registered-user",
    exact: true,
    component: RegisteredUsers,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/moments",
    exact: true,
    component: Moments,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/vibes",
    exact: true,
    component: Vibes,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/sponsored-events",
    exact: true,
    component: SponsoredEvents,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/non-sponsored-events",
    exact: true,
    component: NonSponsoredEvents,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/verifyDocument",
    exact: true,
    component: Verification,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/nationalVerification",
    exact: true,
    component: OutlierBlackVerification,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/coffee-coupon",
    exact: true,
    component: CoffeeCoupon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/clover-purchase",
    exact: true,
    component: Purchase,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/donation-hashtag",
    exact: true,
    component: DonationHashTag,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/report",
    exact: true,
    component: ReportManagement,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    path: "/coupon-request",
    exact: true,
    component: CouponRequest,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (AppRouter);

/***/ })

})
//# sourceMappingURL=main.f200b9173315addb5315.hot-update.js.map