function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var validateBreakpoints = (function (bp, bpLastName) {
  var arrP = [];
  var arrL = [];
  var arrNames = [];

  if (Array.isArray(bp) && bp.length > 0) {
    var validateAndPush = bp.map(function (item) {
      var result; // Check that item has right structure

      if (_typeof(item) === "object" && "name" in item && "value" in item && typeof item.name === "string" && (typeof item.value === "number" || Array.isArray(item.value) && item.value.length === 2 && typeof item.value[0] === "number" && typeof item.value[1] === "number")) {
        arrNames.push(item.name);

        if (typeof item.value === "number") {
          arrP.push(item.value);
          arrL.push(item.value);
        } else {
          arrP.push(item.value[0]);
          arrL.push(item.value[1]);
        }

        result = true;
      } else {
        result = false;
      }

      return result;
    }); // Check all true in validateAndPush
    // eslint-disable-next-line no-restricted-syntax

    for (var val in validateAndPush) {
      if (!validateAndPush[val]) {
        return false;
      }
    } // Check that all names in arrNames is uniq


    if (bpLastName !== undefined && typeof bpLastName === "string") {
      arrNames.push(bpLastName);
    } // const uniqNames = [...new Set(arrNames)]


    var uniqNames = Array.from(new Set(arrNames.map(function (item) {
      return item;
    })));
    if (uniqNames.length !== arrNames.length) return false; // Check that arrP and arrL in ASC Order

    for (var i = 1; i < arrP.length; i += 1) {
      if (arrL[i - 1] > arrL[i]) {
        return false;
      }

      if (arrP[i - 1] > arrP[i]) {
        return false;
      }

      return true;
    }
  }

  return false;
});

var checkIsH = (function (sign, height) {
  if (Number.isInteger(height)) {
    var query = "";

    switch (sign) {
      case ">":
        query = "(min-height: ".concat(height, "px)");
        break;

      case ">=":
        query = "(min-height: ".concat(height - 1, "px)");
        break;

      case "<":
        query = "(max-height: ".concat(height, "px)");
        break;

      case "<=":
        query = "(max-height: ".concat(height + 1, "px)");
        break;

      case "=":
        query = "(max-height: ".concat(height + 1, "px) and (min-height: ").concat(height - 1, "px)");
        break;

      default:
        break;
    }

    if (query !== "") {
      return window.matchMedia(query).matches;
    }
  }

  return false;
});

var checkIsW = (function (sign, width) {
  /* jslint browser: true */

  /* global window */
  if (Number.isInteger(width)) {
    var query = "";

    switch (sign) {
      case ">":
        query = "(min-width: ".concat(width, "px)");
        break;

      case ">=":
        query = "(min-width: ".concat(width - 1, "px)");
        break;

      case "<":
        query = "(max-width: ".concat(width, "px)");
        break;

      case "<=":
        query = "(max-width: ".concat(width + 1, "px)");
        break;

      case "=":
        query = "(max-width: ".concat(width + 1, "px) and (min-width: ").concat(width - 1, "px)");
        break;

      default:
        break;
    }

    if (query !== "") {
      return window.matchMedia(query).matches;
    }
  }

  return false;
});

var BS3 = {
  breakpoints: [{
    name: "xs",
    value: 768 - 1
  }, {
    name: "sm",
    value: 992
  }, {
    name: "md",
    value: 1200
  }],
  breakpointsLastName: "lg"
};

var BS4 = {
  breakpoints: [{
    name: "xs",
    value: 576
  }, {
    name: "sm",
    value: 768
  }, {
    name: "md",
    value: 992
  }, {
    name: "lg",
    value: 1200
  }],
  breakpointsLastName: "xl"
};

var F6 = {
  breakpoints: [{
    name: "small",
    value: 640
  }, {
    name: "medium",
    value: 1024
  }, {
    name: "large",
    value: 1200
  }, {
    name: "xlarge",
    value: 1440
  }],
  breakpointsLastName: "xxlarge"
};

var breakpointsPreset = (function (presetName) {
  switch (presetName) {
    case "Bootstrap3":
    case "BS3":
      return BS3;

    case "Bootstrap":
    case "BS":
    case "Bootstrap4":
    case "BS4":
      return BS4;

    case "Foundation":
    case "F":
    case "Foundation6":
    case "F6":
      return F6;

    default:
      return false;
  }
});

var helpers = {
  result: true,
  breakpoints: {
    isInitialized: false,
    arrNames: [],
    arrP: [],
    arrL: []
  }
};
var helperFunctions = {
  setStateIsL: function setStateIsL($screen) {
    $screen.state.isL = window.matchMedia("(orientation: landscape)").matches;
  },
  setStateScreen: function setStateScreen($screen, options) {
    if (options && helpers.breakpoints.isInitialized) {
      var end = false;
      var targetArr;

      if ($screen.state.isL === true) {
        targetArr = helpers.breakpoints.arrL;
      } else {
        targetArr = helpers.breakpoints.arrP;
      }

      for (var cursor = 0; cursor < targetArr.length; cursor += 1) {
        var width = targetArr[cursor];
        var query = "(max-width: ".concat(width + 1, "px)");

        if (window.matchMedia(query).matches) {
          $screen.state.screen = helpers.breakpoints.arrNames[cursor];
          end = true;
          break;
        }
      }

      if (!end) {
        if (options.breakpointsLastName === undefined) {
          $screen.state.screen = "u_".concat(helpers.breakpoints.arrNames[helpers.breakpoints.arrNames.length - 1]);
        } else {
          $screen.state.screen = helpers.breakpoints.arrNames[helpers.breakpoints.arrNames.length - 1];
        }
      }
    }
  }
};
var vueWhatScreen = {
  install: function install(vue, options) {
    var $screen = {
      methods: {
        computeIsW: function computeIsW(sign, width) {
          return checkIsW(sign, width);
        },
        computeIsH: function computeIsH(sign, height) {
          return checkIsH(sign, height);
        }
      },
      state: {
        isL: undefined,
        screen: undefined
      },
      init: function init() {
        console.log("Now `init()` is unnecessary");
        helpers.result = true;
        return $screen;
      },
      isW: function isW(sign, width) {
        helpers.result = helpers.result && $screen.methods.computeIsW(sign, width);
        return $screen;
      },
      isH: function isH(sign, height) {
        helpers.result = helpers.result && $screen.methods.computeIsH(sign, height);
        return $screen;
      },
      isL: function isL() {
        helpers.result = helpers.result && !!$screen.state.isL;
        return $screen;
      },
      isP: function isP() {
        helpers.result = helpers.result && !$screen.state.isL;
        return $screen;
      },
      isScreen: function isScreen(screen) {
        if (helpers.breakpoints.isInitialized && $screen.state.screen === screen) {
          helpers.result = helpers.result && true;
        } else {
          helpers.result = false;
        }

        return $screen;
      },
      isScreenAd: function isScreenAd(sign, screen) {
        if (helpers.breakpoints.isInitialized && typeof $screen.state.screen === "string" && helpers.breakpoints.arrNames.includes(screen)) {
          var index = helpers.breakpoints.arrNames.indexOf(screen);
          var indexCurrentScreen = helpers.breakpoints.arrNames.indexOf($screen.state.screen);

          switch (sign) {
            case ">":
              if (index > indexCurrentScreen) {
                helpers.result = helpers.result && true;
              } else {
                helpers.result = false;
              }

              break;

            case ">=":
              if (index >= indexCurrentScreen) {
                helpers.result = helpers.result && true;
              } else {
                helpers.result = false;
              }

              break;

            case "<":
              if (index < indexCurrentScreen) {
                helpers.result = helpers.result && true;
              } else {
                helpers.result = false;
              }

              break;

            case "<=":
              if (index <= indexCurrentScreen) {
                helpers.result = helpers.result && true;
              } else {
                helpers.result = false;
              }

              break;

            case "=":
              if (index === indexCurrentScreen) {
                helpers.result = helpers.result && true;
              } else {
                helpers.result = false;
              }

              break;

            default:
              break;
          }
        } else {
          helpers.result = false;
        }

        return $screen;
      },
      done: function done() {
        var result = helpers.result;
        helpers.result = true;
        return result;
      },
      not: function not() {
        var result = helpers.result;
        helpers.result = true;
        return !result;
      } // Initializing breakpoints

    };

    if (options && options.breakpoints && !("breakpointsPreset" in options)) {
      if (validateBreakpoints(options.breakpoints, options.breakpointsLastName)) {
        // eslint-disable-next-line array-callback-return
        options.breakpoints.map(function (item) {
          helpers.breakpoints.arrNames.push(item.name);

          if (typeof item.value === "number") {
            helpers.breakpoints.arrP.push(item.value);
            helpers.breakpoints.arrL.push(item.value);
          } else {
            helpers.breakpoints.arrP.push(item.value[0]);
            helpers.breakpoints.arrL.push(item.value[1]);
          }
        });

        if (options.breakpointsLastName !== undefined) {
          helpers.breakpoints.arrNames.push(options.breakpointsLastName);
        }

        helpers.breakpoints.isInitialized = true;
        helperFunctions.setStateScreen($screen, options);
      }
    } else if (options && options.breakpointsPreset) {
      if ("breakpoints" in options) {
        console.info("options.breakpoints will be ignored");
      }

      if ("breakpointsLastName" in options) {
        console.info("options.breakpointsLastName will be ignored");
      }

      var preset = breakpointsPreset(options.breakpointsPreset);

      if (preset !== false) {
        // eslint-disable-next-line array-callback-return
        preset.breakpoints.map(function (item) {
          helpers.breakpoints.arrNames.push(item.name);

          if (typeof item.value === "number") {
            helpers.breakpoints.arrP.push(item.value);
            helpers.breakpoints.arrL.push(item.value);
          } else {
            helpers.breakpoints.arrP.push(item.value[0]);
            helpers.breakpoints.arrL.push(item.value[1]);
          }
        });
        helpers.breakpoints.arrNames.push(preset.breakpointsLastName);
        helpers.breakpoints.isInitialized = true;
        helperFunctions.setStateScreen($screen, options);
      } else {
        console.error("Initializing of BP :: Failed");
      }
    } else {
      console.error("Initializing of BP :: Failed");
    }

    helperFunctions.setStateIsL($screen); // Initializing orientation state

    var listenResize = function listenResize(listenerFunction) {
      return window.addEventListener("resize", listenerFunction);
    };

    listenResize(function () {
      helperFunctions.setStateIsL($screen);

      if (options && helpers.breakpoints.isInitialized) {
        helperFunctions.setStateScreen($screen, options);
      }
    });
    vue.prototype.$screen = $screen;
  }
};

export default vueWhatScreen;
