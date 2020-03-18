(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/css/carousel.css":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/css/carousel.css ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".carousel.carousel-slider {\n  width: 100%;\n  margin: 0 auto;\n  height: 260px;\n}\n.carousel .thumb {\n  width: 65px;\n  height: 65px;\n}\n.carousel .thumb img {\n  width: 100%;\n  height: 100%;\n}\n.carousel .thumbs {\n  padding-left: 0;\n}\n.carouselPhoto {\n  height: 260px;\n  width: 100%;\n}\n.carouselPhoto img {\n  object-fit: cover;\n  width: 100%;\n  height: 100%;\n}\n.carousel.carousel-slider .control-arrow,\n.carousel .carousel-status {\n  display: none;\n}\n.carousel .thumbs-wrapper {\n  margin: 20px 0;\n}\n\n/* register card */\n.register-card {\n  display: grid;\n  grid-template-rows: 1fr;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 10px;\n}\n/* 1510px css code */\n@media screen and (max-width: 1510px) {\n  .register-card {\n    grid-template-columns: 1fr;\n  }\n}\n", ""]);



/***/ }),

/***/ "./src/css/carousel.css":
/*!******************************!*\
  !*** ./src/css/carousel.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../node_modules/postcss-loader/src??postcss!./carousel.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/css/carousel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../node_modules/postcss-loader/src??postcss!./carousel.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/css/carousel.css", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../node_modules/postcss-loader/src??postcss!./carousel.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/css/carousel.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/screens/RegisteredUsers.js":
/*!****************************************!*\
  !*** ./src/screens/RegisteredUsers.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/endpoints */ "./src/utils/endpoints.js");
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-responsive-carousel/lib/styles/carousel.min.css */ "./node_modules/react-responsive-carousel/lib/styles/carousel.min.css");
/* harmony import */ var react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel_lib_styles_carousel_min_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-responsive-carousel */ "./node_modules/react-responsive-carousel/lib/index.js");
/* harmony import */ var react_responsive_carousel__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_responsive_carousel__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_carousel_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../css/carousel.css */ "./src/css/carousel.css");
/* harmony import */ var _css_carousel_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_carousel_css__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/home/ashu/projects/outliers-admin/src/screens/RegisteredUsers.js";







const token = localStorage.getItem("token");

class RegisteredUsers extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    this.filterOnSearch = entry => {
      if (!this.state.searched) {
        return entry;
      } else {
        let filteredEntry = [];
        entry.map(item => {
          if (item.title.toString().toLowerCase().match(this.state.searchText.toLowerCase()) !== null) {
            filteredEntry.push(item);
          }
        });
        return filteredEntry;
      }
    };

    this.registeredUserCard = newRegisteredUser => {
      return newRegisteredUser.map(record => {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
          style: {
            marginBottom: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 93
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 9,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_responsive_carousel__WEBPACK_IMPORTED_MODULE_5__["Carousel"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          },
          __self: this
        }, record.photos.length ? record.photos.map((photo, i) => {
          console.log("photo ", i, photo.url);
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: "carouselPhoto",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 106
            },
            __self: this
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
            src: photo.url,
            alt: "answer image",
            __source: {
              fileName: _jsxFileName,
              lineNumber: 107
            },
            __self: this
          }));
        }) : "")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 15,
          style: {
            paddingLeft: "1.5rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 114
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          style: {
            padding: "0 0.5rem 1.2rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 115
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 116
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            fontSize: "1.5rem",
            fontWeight: "bolder",
            fontStretch: "0.8rem",
            textTransform: "capitalize"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          },
          __self: this
        }, "Profile Detail"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          style: {
            padding: "0 0.5rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 125
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 24,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 126
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.75rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 127
          },
          __self: this
        }, "Email : "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 128
          },
          __self: this
        }, record.email)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 24,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 130
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.75rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 131
          },
          __self: this
        }, "Username: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 132
          },
          __self: this
        }, record.username))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          style: {
            padding: "0 0.5rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 135
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 24,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 136
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.75rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 137
          },
          __self: this
        }, "User status: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 138
          },
          __self: this
        }, record.userStatus === "rejected" ? "rejected" : record.isVerified && record.isRegistered ? "accepted" : "pending")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 24,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 146
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.75rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 147
          },
          __self: this
        }, "School: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 148
          },
          __self: this
        }, record.race))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          style: {
            padding: "0 0.5rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 151
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 24,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 152
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.75rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 153
          },
          __self: this
        }, "Race: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 154
          },
          __self: this
        }, record.school)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 24,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 156
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: "0.75rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 157
          },
          __self: this
        }, "Occupation: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 158
          },
          __self: this
        }, record.occupation))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          style: {
            margin: "1rem 0 0"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 164
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 13,
          style: {
            margin: "0.5rem"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 165
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            margin: "1rem",
            marginLeft: 0
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 166
          },
          __self: this
        }, record.occupationVerifyMode.toLowerCase() === "document" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          style: {
            width: "200px",
            height: "120px"
          },
          src: record.occupationDocumentOrEmail,
          alt: "Document image",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 168
          },
          __self: this
        }) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            margin: "1rem",
            marginLeft: 0
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 177
          },
          __self: this
        }, record.universityVerifyMode.toLowerCase() === "document" ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          style: {
            width: "200px",
            height: "120px"
          },
          src: record.universityDocumentOrEmail,
          alt: "Document image",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 179
          },
          __self: this
        }) : ""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          style: {
            margin: "1rem",
            marginLeft: 0
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 188
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          style: {
            width: "200px",
            height: "120px"
          },
          src: record.wealthDocument.length ? record.wealthDocument : "",
          alt: "Document image",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 189
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          span: 9,
          style: {
            margin: "0.5rem",
            float: "right"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 196
          },
          __self: this
        }, record.isVerified && record.isRegistered ? "" : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 200
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Popconfirm"], {
          title: "Are you sure confirm this user?",
          onConfirm: () => this.confirmUser(record._id),
          okText: "Yes",
          cancelText: "No",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 201
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          type: "primary",
          icon: "check",
          size: "medium",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 207
          },
          __self: this
        }, "Confirm"))), record.userStatus === "rejected" ? "" : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 216
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Divider"], {
          type: "vertical",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Popconfirm"], {
          title: "Are you sure reject this user?",
          onConfirm: () => this.rejectUser(record._id),
          okText: "Yes",
          cancelText: "No",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 218
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          type: "danger",
          icon: "cross",
          size: "medium",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 224
          },
          __self: this
        }, "Reject"))))));
      });
    };

    this.state = {
      newRegisteredUser: [],
      loading: false
    };
    this.getRegisteredUser = this.getRegisteredUser.bind(this);
  }

  componentDidMount() {
    this.getRegisteredUser();
  }

  getRegisteredUser() {
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(_utils_endpoints__WEBPACK_IMPORTED_MODULE_3__["GET_NEW_REGISTERED_URL"], {
      headers: {
        Authorization: token
      }
    }).then(res => {
      console.log("registered user", res.data.Body);
      this.setState({
        newRegisteredUser: res.data.Body,
        loading: false
      });
    }).catch(err => {
      antd__WEBPACK_IMPORTED_MODULE_1__["message"].error(err.message);
    });
  }

  rejectUser(_id) {
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.patch("https://outlier.mckinleyrice.com/admin/user/reject?userId=".concat(_id), {
      id: _id,
      isVerified: false,
      isRegistered: false
    }, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then(res => window.location.reload()).catch(err => console.log(err));
  }

  confirmUser(_id) {
    axios__WEBPACK_IMPORTED_MODULE_2___default.a.patch("https://outlier.mckinleyrice.com/admin/user?userId=".concat(_id), {
      id: _id,
      isVerified: true,
      isRegistered: true
    }, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    }).then(res => window.location.reload()).catch(err => console.log(err));
  }

  render() {
    const newRegisteredUser = this.state.newRegisteredUser;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 240
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Card"], {
      headStyle: {
        fontSize: "1.5rem"
      },
      size: "small",
      title: "New Registered User",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 241
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "register-card",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 242
      },
      __self: this
    }, this.registeredUserCard(this.filterOnSearch(newRegisteredUser)))));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (RegisteredUsers);

/***/ }),

/***/ "./src/utils/endpoints.js":
/*!********************************!*\
  !*** ./src/utils/endpoints.js ***!
  \********************************/
/*! exports provided: ADMIN_LOGIN_URL, GET_USER_URL, PUT_USER_PROFILE_URL, GET_MOMENTS_URL, GET_VIBES_URL, DELETE_MOMENT_VIBE_URL, PUT_USER_URL, GET_GENDER_USER_URL, GET_NEW_USER_URL, GET_NEW_REGISTERED_URL, GET_REPORT_URL, PATCH_DEACTIVATE_URL, GET_DONATION_HASHTAG_URL, GET_STATISTICS_URL, GET_COUNT_COFFEE_COUPON_URL, GET_COFFEE_REQUEST_URL, PATCH_COFFEE_RESOLVE_URL, GET_CLOVER_COUNT_URL, GET_WEEKLY_COFFEE_COUPON_URL, GET_WEEKLY_USER_COUNT_URL, GET_WEEKLY_UNRESOLVED_REPORT_URL, GET_WEEKLY_PURCHASE_URL, GET_EVENT_SPONSORED_URL, GET_EVENT_NON_SPONSORED_URL, POST_EVENT_SPONSORED_URL, PUT_EVENT_SPONSORED_URL, DELETE_EVENT_SPONSORED_URL, GET_EVENTS_URL, PATCH_VERIFY_DOCUMENT_URL, PATCH_OUTLIER_VERIFY_DOCUMENT_URL, GET_COFFEE_COUPON_URL, GET_CLOVER_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMIN_LOGIN_URL", function() { return ADMIN_LOGIN_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_USER_URL", function() { return GET_USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUT_USER_PROFILE_URL", function() { return PUT_USER_PROFILE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_MOMENTS_URL", function() { return GET_MOMENTS_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_VIBES_URL", function() { return GET_VIBES_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_MOMENT_VIBE_URL", function() { return DELETE_MOMENT_VIBE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUT_USER_URL", function() { return PUT_USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_GENDER_USER_URL", function() { return GET_GENDER_USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_NEW_USER_URL", function() { return GET_NEW_USER_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_NEW_REGISTERED_URL", function() { return GET_NEW_REGISTERED_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_REPORT_URL", function() { return GET_REPORT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_DEACTIVATE_URL", function() { return PATCH_DEACTIVATE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_DONATION_HASHTAG_URL", function() { return GET_DONATION_HASHTAG_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_STATISTICS_URL", function() { return GET_STATISTICS_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_COUNT_COFFEE_COUPON_URL", function() { return GET_COUNT_COFFEE_COUPON_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_COFFEE_REQUEST_URL", function() { return GET_COFFEE_REQUEST_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_COFFEE_RESOLVE_URL", function() { return PATCH_COFFEE_RESOLVE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CLOVER_COUNT_URL", function() { return GET_CLOVER_COUNT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_WEEKLY_COFFEE_COUPON_URL", function() { return GET_WEEKLY_COFFEE_COUPON_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_WEEKLY_USER_COUNT_URL", function() { return GET_WEEKLY_USER_COUNT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_WEEKLY_UNRESOLVED_REPORT_URL", function() { return GET_WEEKLY_UNRESOLVED_REPORT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_WEEKLY_PURCHASE_URL", function() { return GET_WEEKLY_PURCHASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_EVENT_SPONSORED_URL", function() { return GET_EVENT_SPONSORED_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_EVENT_NON_SPONSORED_URL", function() { return GET_EVENT_NON_SPONSORED_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_EVENT_SPONSORED_URL", function() { return POST_EVENT_SPONSORED_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUT_EVENT_SPONSORED_URL", function() { return PUT_EVENT_SPONSORED_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_EVENT_SPONSORED_URL", function() { return DELETE_EVENT_SPONSORED_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_EVENTS_URL", function() { return GET_EVENTS_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_VERIFY_DOCUMENT_URL", function() { return PATCH_VERIFY_DOCUMENT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_OUTLIER_VERIFY_DOCUMENT_URL", function() { return PATCH_OUTLIER_VERIFY_DOCUMENT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_COFFEE_COUPON_URL", function() { return GET_COFFEE_COUPON_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CLOVER_URL", function() { return GET_CLOVER_URL; });
const ADMIN_LOGIN_URL = "https://outlier.mckinleyrice.com/admin-login";
const GET_USER_URL = "https://outlier.mckinleyrice.com/admin/users";
const PUT_USER_PROFILE_URL = "https://outlier.mckinleyrice.com/admin/user/edit-profile";
const GET_MOMENTS_URL = "https://outlier.mckinleyrice.com/admin/moments";
const GET_VIBES_URL = "https://outlier.mckinleyrice.com/admin/vibes";
const DELETE_MOMENT_VIBE_URL = "https://outlier.mckinleyrice.com/admin/moment-vibe";
const PUT_USER_URL = "https://outlier.mckinleyrice.com/admin/user";
const GET_GENDER_USER_URL = "https://outlier.mckinleyrice.com/admin/users/gender";
const GET_NEW_USER_URL = "https://outlier.mckinleyrice.com/admin/users/new";
const GET_NEW_REGISTERED_URL = "https://outlier.mckinleyrice.com/admin/users/new-reg";
const GET_REPORT_URL = "https://outlier.mckinleyrice.com/admin/reports";
const PATCH_DEACTIVATE_URL = "https://outlier.mckinleyrice.com/admin/deactivate";
const GET_DONATION_HASHTAG_URL = "https://outlier.mckinleyrice.com/user/donation";
const GET_STATISTICS_URL = "https://outlier.mckinleyrice.com/user-count";
const GET_COUNT_COFFEE_COUPON_URL = "https://outlier.mckinleyrice.com/admin/coffee/pending";
const GET_COFFEE_REQUEST_URL = "https://outlier.mckinleyrice.com/admin/coffee/request";
const PATCH_COFFEE_RESOLVE_URL = "https://outlier.mckinleyrice.com/admin/coffee/resolve";
const GET_CLOVER_COUNT_URL = "https://outlier.mckinleyrice.com/admin/clover/count";
const GET_WEEKLY_COFFEE_COUPON_URL = "https://outlier.mckinleyrice.com/admin/coffee/pending/weekwise";
const GET_WEEKLY_USER_COUNT_URL = "https://outlier.mckinleyrice.com/user/active/weekwise";
const GET_WEEKLY_UNRESOLVED_REPORT_URL = "https://outlier.mckinleyrice.com/report/unresolved/weekwise";
const GET_WEEKLY_PURCHASE_URL = "https://outlier.mckinleyrice.com/admin/clover/purchases/weekwise";
const GET_EVENT_SPONSORED_URL = "https://outlier.mckinleyrice.com/admin/events/sponsored";
const GET_EVENT_NON_SPONSORED_URL = "https://outlier.mckinleyrice.com/admin/events/non-sponsored";
const POST_EVENT_SPONSORED_URL = "https://outlier.mckinleyrice.com/admin/event";
const PUT_EVENT_SPONSORED_URL = "https://outlier.mckinleyrice.com/admin/event";
const DELETE_EVENT_SPONSORED_URL = "https://outlier.mckinleyrice.com/admin/event";
const GET_EVENTS_URL = "https://outlier.mckinleyrice.com/admin/events";
const PATCH_VERIFY_DOCUMENT_URL = "https://outlier.mckinleyrice.com/admin/verify-by-docs";
const PATCH_OUTLIER_VERIFY_DOCUMENT_URL = "https://outlier.mckinleyrice.com/admin/verify-by-docs";
const GET_COFFEE_COUPON_URL = "https://outlier.mckinleyrice.com/admin/coffee/status";
const GET_CLOVER_URL = "https://outlier.mckinleyrice.com/admin/clover/purchases";

/***/ })

}]);
//# sourceMappingURL=14.chunk.js.map