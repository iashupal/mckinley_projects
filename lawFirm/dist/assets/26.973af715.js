(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1693:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var assets_images_components_slider_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2153);\n/* harmony import */ var assets_images_components_slider_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assets_images_components_slider_png__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var components_RangeSlider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2154);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar Test =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Test, _Component);\n\n  function Test() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, Test);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Test)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_this), "state", {\n      value: 50\n    });\n\n    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event, value) {\n      _this.setState({\n        value: value\n      });\n    });\n\n    return _this;\n  }\n\n  _createClass(Test, [{\n    key: "render",\n    value: function render() {\n      var value = this.state.value;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n        className: "app-wrapper"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_RangeSlider__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {\n        onChange: this.handleChange,\n        value: value\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ==\\uAC1C\\uBC1C \\uD14C\\uC2A4\\uD2B8== ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), " ==\\uC694\\uCCAD\\uC0AC\\uD56D== ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "[\\uCEF4\\uD3EC\\uB10C\\uD2B8] Slider", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {\n        src: assets_images_components_slider_png__WEBPACK_IMPORTED_MODULE_1___default.a,\n        alt: ""\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {\n        href: "https://developer.microsoft.com/en-us/fabric#/components/slider",\n        target: "_blank"\n      }, "https://developer.microsoft.com/en-us/fabric#/components/slider"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {\n        href: "http://sian.giantsoft.co.kr/view.php?c=HUMAXIT&v=15696&PHPSESSID=5ca36664c458fcc12c10d72937ca311a",\n        target: "_blank"\n      }, "http://sian.giantsoft.co.kr/view.php?c=HUMAXIT&v=15696&PHPSESSID=5ca36664c458fcc12c10d72937ca311a"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null));\n    }\n  }, {\n    key: "__reactstandin__regenerateByEval",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return Test;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\nvar _default = Test;\n/* harmony default export */ __webpack_exports__["default"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Test, "Test", "/home/ashu/projects/LawFirm_new/LawFirm/src/app/routes/ComponentsTest2/SliderTest/index.js");\n  reactHotLoader.register(_default, "default", "/home/ashu/projects/LawFirm_new/LawFirm/src/app/routes/ComponentsTest2/SliderTest/index.js");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)(module)))\n\n//# sourceURL=app/routes/ComponentsTest2/SliderTest/index.js')},2153:function(module,exports,__webpack_require__){eval('module.exports = __webpack_require__.p + "418ae76aa41526751ec7ba125e2c5100.png";\n\n//# sourceURL=assets/images/components/slider.png')},2154:function(module,__webpack_exports__,__webpack_require__){"use strict";eval("/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(795);\n/* harmony import */ var _material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _material_ui_icons_LensOutlined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2155);\n/* harmony import */ var _material_ui_icons_LensOutlined__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_LensOutlined__WEBPACK_IMPORTED_MODULE_4__);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\nvar styles = function styles(theme) {\n  return {\n    root: {\n      width: 300,\n      display: 'inline-block'\n    },\n    slider: {\n      padding: '22px 0px'\n    },\n    sliderTrack: {\n      height: '4px'\n    },\n    thumbIcon: {\n      borderRadius: '50%'\n    },\n    thumbIconWrapper: {\n      backgroundColor: 'white'\n    },\n    lensIcon: {\n      color: theme.palette.primary.main,\n      width: 20,\n      height: 20,\n      position: 'absolute',\n      top: -5\n    },\n    track: {\n      height: 4.2,\n      borderRadius: 30\n    },\n    trackBefore: {\n      height: 4.2,\n      borderRadius: 30\n    },\n    trackAfter: {\n      height: 4.2,\n      borderRadius: 30\n    },\n    sliderValue: {\n      display: 'inline-block',\n      verticalAlign: 'text-bottom',\n      paddingLeft: '15px'\n    }\n  };\n};\n\nfunction RangeSlider(_ref) {\n  var classes = _ref.classes,\n      value = _ref.value,\n      disabled = _ref.disabled,\n      onChange = _ref.onChange;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes.RangeSliderWrapper\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: classes.root\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_lab_Slider__WEBPACK_IMPORTED_MODULE_3___default.a, {\n    value: value,\n    disabled: disabled,\n    \"aria-labelledby\": \"slider-icon\",\n    onChange: onChange,\n    step: 1,\n    classes: {\n      root: classes.slider,\n      thumbIconWrapper: classes.thumbIconWrapper,\n      track: classes.track\n    },\n    thumb: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_LensOutlined__WEBPACK_IMPORTED_MODULE_4___default.a, {\n      className: classes.lensIcon\n    })\n  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n    className: classes.sliderValue\n  }, value));\n}\n\nRangeSlider.propTypes = {\n  classes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired\n};\n\nvar _default = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__[\"withStyles\"])(styles)(RangeSlider);\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(styles, \"styles\", \"/home/ashu/projects/LawFirm_new/LawFirm/src/components/RangeSlider/index.js\");\n  reactHotLoader.register(RangeSlider, \"RangeSlider\", \"/home/ashu/projects/LawFirm_new/LawFirm/src/components/RangeSlider/index.js\");\n  reactHotLoader.register(_default, \"default\", \"/home/ashu/projects/LawFirm_new/LawFirm/src/components/RangeSlider/index.js\");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)(module)))\n\n//# sourceURL=components/RangeSlider/index.js")},2155:function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _interopRequireDefault = __webpack_require__(5);\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(0));\n\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(296));\n\nvar _default = (0, _createSvgIcon.default)(_react.default.createElement(_react.default.Fragment, null, _react.default.createElement("path", {\n  fill: "none",\n  d: "M0 0h24v24H0V0z"\n}), _react.default.createElement("g", null, _react.default.createElement("path", {\n  d: "M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"\n}))), \'LensOutlined\');\n\nexports.default = _default;\n\n//# sourceURL=../node_modules/@material-ui/icons/LensOutlined.js')}}]);