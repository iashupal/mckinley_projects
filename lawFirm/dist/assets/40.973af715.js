(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{1677:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var components_Table_EnhancedTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73);\n/* harmony import */ var components_Template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2084);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nfunction _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\nvar Test =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Test, _Component);\n\n  function Test() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    _classCallCheck(this, Test);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Test)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _defineProperty(_assertThisInitialized(_this), "state", {\n      templateValue: []\n    });\n\n    return _this;\n  }\n\n  _createClass(Test, [{\n    key: "render",\n    value: function render() {\n      var _this2 = this;\n\n      var templateValue = this.state.templateValue;\n      var style = {\n        paddingTop: \'20px\'\n      };\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n        className: "app-wrapper"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "-------------------- \\uD15C\\uD50C\\uB9BF JSON \\uC0DD\\uC131 UI --------------------"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Template__WEBPACK_IMPORTED_MODULE_2__[/* MakeTemplate */ "b"], {\n        dataArr: templateValue,\n        setDataArr: function setDataArr(templateValue) {\n          _this2.setState({\n            templateValue: templateValue\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "1. Add \\uCEF4\\uD3EC\\uB10C\\uD2B8\\uBCC4, \\uC138\\uBD80 \\uB370\\uC774\\uD130\\uC815\\uBCF4 \\uC785\\uB825 Form \\uCD94\\uAC00"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "2. \\uC785\\uB825\\uB41C \\uCEF4\\uD3EC\\uB10C\\uD2B8 \\uBCF4\\uC5EC\\uC8FC\\uACE0, \\"\\uC138\\uBD80 \\uB370\\uC774\\uD130 \\uC218\\uC815 / \\uAC1C\\uBCC4\\uC0AD\\uC81C / Sort \\uAE30\\uB2A5\\""), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "3. Sort \\uAC00\\uB2A5\\uD55C \\uD2B8\\uB9AC\\uAE30\\uB2A5 (\\uC678\\uBD80 \\uB77C\\uC774\\uBE0C\\uB7EC\\uB9AC) \\uAC80\\uD1A0"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n        style: style\n      }, "-------------------- \\uD15C\\uD50C\\uB9BF JSON -> \\uCEF4\\uD3EC\\uB10C\\uD2B8 --------------------"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Template__WEBPACK_IMPORTED_MODULE_2__[/* ConvertedComponent */ "a"], {\n        dataArr: templateValue,\n        setDataArr: function setDataArr(templateValue) {\n          _this2.setState({\n            templateValue: templateValue\n          });\n        }\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n        style: style\n      }, "-------------------- \\uD15C\\uD50C\\uB9BF JSON \\uB0B4\\uBD80\\uAC12 --------------------"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, JSON.stringify(templateValue, null, 4)));\n    }\n  }, {\n    key: "__reactstandin__regenerateByEval",\n    // @ts-ignore\n    value: function __reactstandin__regenerateByEval(key, code) {\n      // @ts-ignore\n      this[key] = eval(code);\n    }\n  }]);\n\n  return Test;\n}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);\n\nvar _default = Test;\n/* harmony default export */ __webpack_exports__["default"] = (_default);\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Test, "Test", "/home/ashu/projects/LawFirm_new/LawFirm/src/app/routes/ComponentsTest/TemplateTest/index.js");\n  reactHotLoader.register(_default, "default", "/home/ashu/projects/LawFirm_new/LawFirm/src/app/routes/ComponentsTest/TemplateTest/index.js");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)(module)))\n\n//# sourceURL=app/routes/ComponentsTest/TemplateTest/index.js')},2084:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MakeTemplate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConvertedComponent; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var components_InputBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42);\n/* harmony import */ var components_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58);\n/* harmony import */ var components_ButtonN__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(126);\n/* harmony import */ var _material_ui_core_Table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(212);\n/* harmony import */ var _material_ui_core_Table__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(273);\n/* harmony import */ var _material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(213);\n/* harmony import */ var _material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(85);\n/* harmony import */ var _material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(154);\n/* harmony import */ var _material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var helpers_ramda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar __signature__ = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n\n\n\n\n\n\n\n\nvar clone = helpers_ramda__WEBPACK_IMPORTED_MODULE_9__[/* R */ "b"].clone;\nvar dataLabel = {\n  type: \'label\',\n  value: \'new label : \'\n};\nvar dataInput = {\n  type: \'input\',\n  value: \'new input component\'\n};\nvar dataSelect = {\n  type: \'select\',\n  label: \'선택\',\n  value: \'1\',\n  list: [{\n    key: \'1\',\n    text: \'테스트-1\'\n  }, {\n    key: \'2\',\n    text: \'테스트-2\'\n  }, {\n    key: \'3\',\n    text: \'테스트-3\'\n  }]\n};\nvar dataButton = {\n  type: \'button\',\n  label: \'저장\'\n};\nvar dataBr = {\n  type: \'br\'\n};\nvar dataDiv = {\n  type: \'div\',\n  child: [{\n    type: \'div\',\n    child: [{\n      type: \'input\',\n      value: \'new input component\'\n    }, {\n      type: \'input\',\n      value: \'new input component\'\n    }]\n  }, {\n    type: \'button\',\n    label: \'저장\'\n  }]\n};\nvar dataTable = {\n  type: \'table\',\n  child: [{\n    type: \'tableHead\',\n    child: [{\n      type: \'tableCell\',\n      child: [{\n        type: \'label\',\n        value: \'Input-1\'\n      }]\n    }, {\n      type: \'tableCell\',\n      child: [{\n        type: \'label\',\n        value: \'Input-2\'\n      }]\n    }, {\n      type: \'tableCell\',\n      child: [{\n        type: \'label\',\n        value: \'Input-3\'\n      }]\n    }]\n  }, {\n    type: \'tableBody\',\n    child: [{\n      type: \'tableRow\',\n      child: [{\n        type: \'tableCell\',\n        child: [{\n          type: \'input\',\n          value: \'\'\n        }]\n      }, {\n        type: \'tableCell\',\n        child: [{\n          type: \'input\',\n          value: \'\'\n        }]\n      }, {\n        type: \'tableCell\',\n        child: [{\n          type: \'input\',\n          value: \'\'\n        }]\n      }]\n    } // {\n    //   type: \'tableRow\',\n    //   child: [\n    //     {\n    //       type: \'tableCell\',\n    //       child: [{ type: \'input\', value: \'\' }],\n    //     },\n    //     {\n    //       type: \'tableCell\',\n    //       child: [{ type: \'input\', value: \'\' }],\n    //     },\n    //     {\n    //       type: \'tableCell\',\n    //       child: [{ type: \'input\', value: \'\' }],\n    //     },\n    //   ],\n    // },\n    ]\n  }]\n};\nvar MakeTemplate = function MakeTemplate(_ref) {\n  var dataArr = _ref.dataArr,\n      setDataArr = _ref.setDataArr;\n\n  var addDataArr = function addDataArr(item) {\n    return setDataArr([].concat(_toConsumableArray(dataArr), [item]));\n  };\n\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "primary",\n    onClick: function onClick() {\n      addDataArr(dataLabel);\n    },\n    label: "Label"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "primary",\n    onClick: function onClick() {\n      addDataArr(dataInput);\n    },\n    label: "Input"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "primary",\n    onClick: function onClick() {\n      addDataArr(dataSelect);\n    },\n    label: "Select"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "primary",\n    onClick: function onClick() {\n      addDataArr(dataButton);\n    },\n    label: "Button"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "dark",\n    onClick: function onClick() {\n      addDataArr(dataTable);\n    },\n    label: "dataTable"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "dark",\n    onClick: function onClick() {\n      var newDataArr = clone(dataArr);\n      newDataArr[0].child[1].child.push({\n        type: \'tableRow\',\n        child: [{\n          type: \'tableCell\',\n          child: [{\n            type: \'input\',\n            value: \'\'\n          }]\n        }, {\n          type: \'tableCell\',\n          child: [{\n            type: \'input\',\n            value: \'\'\n          }]\n        }, {\n          type: \'tableCell\',\n          child: [{\n            type: \'input\',\n            value: \'\'\n          }]\n        }]\n      });\n      setDataArr(newDataArr);\n    },\n    label: "add TableRow (dataTable 1\\uAC1C\\uB9CC \\uC788\\uC744\\uB584 \\uB3D9\\uC791)"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "warning",\n    onClick: function onClick() {\n      alert(JSON.stringify(dataArr));\n    },\n    label: "ALL-DATA"\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "danger",\n    onClick: function onClick() {\n      setDataArr([]);\n    },\n    label: "Remove All"\n  }));\n};\n\nvar CompLabel = function CompLabel(_ref2) {\n  var data = _ref2.data;\n  var value = data.value;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, value);\n};\n\nvar CompBr = function CompBr() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {\n    style: {\n      width: \'100%\'\n    }\n  }, "\\xA0");\n};\n\nvar CompInputBox = function CompInputBox(_ref3) {\n  var data = _ref3.data,\n      setData = _ref3.setData;\n  var value = data.value;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_InputBox__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {\n    value: value // width="200px"\n    ,\n    onChange: function onChange(e) {\n      var newData = clone(data);\n      newData.value = e.target.value;\n      setData(newData);\n    }\n  });\n};\n\nvar CompSelect = function CompSelect(_ref4) {\n  var data = _ref4.data,\n      setData = _ref4.setData;\n  var label = data.label,\n      list = data.list,\n      value = data.value;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Select__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {\n    placeholder: label,\n    options: list,\n    onChange: function onChange(event, option, i) {\n      var newData = clone(data);\n      newData.value = option.key;\n      setData(newData);\n    },\n    selectedKey: value\n  });\n};\n\nvar CompButtonN = function CompButtonN(_ref5) {\n  var data = _ref5.data,\n      handleClick = _ref5.handleClick;\n  var label = data.label;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_ButtonN__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {\n    color: "primary",\n    onClick: handleClick,\n    label: label\n  });\n};\n\nvar CompDiv = function CompDiv(_ref6) {\n  var data = _ref6.data,\n      setData = _ref6.setData;\n  var child = data.child;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {\n    className: "CompDiv"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ConvertedComponent, {\n    dataArr: child,\n    setDataArr: function setDataArr(newItem) {\n      var newData = clone(data);\n      newData.child = newItem;\n      setData(newData);\n    }\n  }));\n};\n\nvar CompTable = function CompTable(_ref7) {\n  var data = _ref7.data,\n      setData = _ref7.setData;\n  var child = data.child;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_4___default.a, {\n    "aria-labelledby": "tableTitle"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ConvertedComponent, {\n    dataArr: child,\n    setDataArr: function setDataArr(newItem) {\n      var newData = clone(data);\n      newData.child = newItem;\n      setData(newData);\n    }\n  }));\n};\n\nvar CompTableHead = function CompTableHead(_ref8) {\n  var data = _ref8.data,\n      setData = _ref8.setData;\n  var child = data.child;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_5___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8___default.a, {\n    className: "table-row"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ConvertedComponent, {\n    dataArr: child,\n    setDataArr: function setDataArr(newItem) {\n      var newData = clone(data);\n      newData.child = newItem;\n      setData(newData);\n    }\n  })));\n};\n\nvar CompTableBody = function CompTableBody(_ref9) {\n  var data = _ref9.data,\n      setData = _ref9.setData;\n  var child = data.child;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableBody__WEBPACK_IMPORTED_MODULE_6___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ConvertedComponent, {\n    dataArr: child,\n    setDataArr: function setDataArr(newItem) {\n      var newData = clone(data);\n      newData.child = newItem;\n      setData(newData);\n    }\n  }));\n};\n\nvar CompTableRow = function CompTableRow(_ref10) {\n  var data = _ref10.data,\n      setData = _ref10.setData;\n  var child = data.child;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ConvertedComponent, {\n    dataArr: child,\n    setDataArr: function setDataArr(newItem) {\n      var newData = clone(data);\n      newData.child = newItem;\n      setData(newData);\n    }\n  }));\n};\n\nvar CompTableCell = function CompTableCell(_ref11) {\n  var data = _ref11.data,\n      setData = _ref11.setData;\n  var child = data.child;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_7___default.a, {\n    style: {\n      textAlign: \'center\'\n    }\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ConvertedComponent, {\n    dataArr: child,\n    setDataArr: function setDataArr(newItem) {\n      var newData = clone(data);\n      newData.child = newItem;\n      setData(newData);\n    }\n  }));\n};\n\nvar ConvertedComponent = function ConvertedComponent(_ref12) {\n  var dataArr = _ref12.dataArr,\n      setDataArr = _ref12.setDataArr;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, dataArr && dataArr.map(function (a, index) {\n    var type = a.type;\n    if (type === \'label\') return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompLabel, {\n      key: index,\n      data: a\n    });\n    if (type === \'br\') return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompBr, {\n      key: index\n    });\n    if (type === \'button\') return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompButtonN, {\n      key: index,\n      data: a,\n      handleClick: function handleClick() {\n        return alert(JSON.stringify(dataArr));\n      }\n    });\n\n    if (type === \'input\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompInputBox, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'select\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompSelect, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'div\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompDiv, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'table\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompTable, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'tableHead\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompTableHead, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'tableBody\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompTableBody, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'tableRow\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompTableRow, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    if (type === \'tableCell\') {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CompTableCell, {\n        key: index,\n        data: a,\n        setData: function setData(newData) {\n          var newTemplateValue = clone(dataArr);\n          newTemplateValue[index] = newData;\n          setDataArr(newTemplateValue);\n        }\n      });\n    }\n\n    return null;\n  }));\n};\n;\n\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.default : undefined;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(clone, "clone", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataLabel, "dataLabel", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataInput, "dataInput", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataSelect, "dataSelect", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataButton, "dataButton", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataBr, "dataBr", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataDiv, "dataDiv", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(dataTable, "dataTable", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(MakeTemplate, "MakeTemplate", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompLabel, "CompLabel", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompBr, "CompBr", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompInputBox, "CompInputBox", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompSelect, "CompSelect", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompButtonN, "CompButtonN", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompDiv, "CompDiv", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompTable, "CompTable", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompTableHead, "CompTableHead", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompTableBody, "CompTableBody", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompTableRow, "CompTableRow", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(CompTableCell, "CompTableCell", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n  reactHotLoader.register(ConvertedComponent, "ConvertedComponent", "/home/ashu/projects/LawFirm_new/LawFirm/src/components/Template/index.js");\n})();\n\n;\n\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)(module)))\n\n//# sourceURL=components/Template/index.js')}}]);