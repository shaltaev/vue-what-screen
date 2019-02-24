// import { assertNever } from "../enums-as-type/type-helper"
var checkIsH = (function (sign, height) {
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
      // assertNever(sign)
      break;
  }

  return window.matchMedia(query).matches;
});

// import { assertNever } from "../enums-as-type/type-helper"
var checkIsW = (function (sign, width) {
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
      // assertNever(sign)
      break;
  }

  return window.matchMedia(query).matches;
});

var BS3 = [[["xs", 768 - 1], ["sm", 992], ["md", 1200]], "lg"];

var BS4 = [[["xs", 576], ["sm", 768], ["md", 992], ["lg", 1200]], "xl"];

var F6 = [[["small", 640], ["medium", 1024], ["large", 1200], ["xlarge", 1440]], "xxlarge"];

var bpGetSet = function bpGetSet(presetName) {
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
};

// import validateBreakpoints from "./func/validateBreakpoints"

var parseBP = function parseBP(bp) {
  if (bp.name) {
    return [bp.name, bp.value];
  }

  if (bp[0]) {
    return bp;
  } // assertNever(bp)


  return ["never", 0];
};

var setBp = function setBp(bp, target) {
  var bpOs = bp[0];
  bpOs.map(function (item) {
    var itemAsArr = parseBP(item);

    if (Array.isArray(itemAsArr[1])) {
      target.breakpoints.arrP.push(itemAsArr[1][0]);
      target.breakpoints.arrL.push(itemAsArr[1][1]);
    } else {
      target.breakpoints.arrP.push(itemAsArr[1]);
      target.breakpoints.arrL.push(itemAsArr[1]);
    }

    target.breakpoints.arrNames.push(itemAsArr[0]);
  });

  if (typeof bp[1] !== "undefined") {
    target.breakpoints.arrNames.push(bp[1]);
  } else {
    target.breakpoints.arrNames.push("u_".concat(target.breakpoints.arrNames[target.breakpoints.arrNames.length - 1]));
  }

  target.breakpoints.isInitialized = true;
};

// Added for backward compatibility
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
        screen: undefined //   helpers

      },
      init: function init() {
        // console.log("Now `init()` is unnecessary")
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

    if (options) {
      var preBp;

      if (options.bp) {
        preBp = options.bp;
      } else if (options.breakpoints) {
        preBp = [options.breakpoints, options.breakpointsLastName];
      } else if (options.breakpointsPreset) {
        preBp = options.breakpointsPreset;
      } else {
        preBp = undefined;
      } // as preset


      if (typeof preBp !== "undefined") {
        if (typeof preBp === "string") {
          var bpSet = bpGetSet(preBp);

          if (bpSet !== false) {
            setBp(bpSet, helpers);
          }
        } else if (preBp.breakpointsPreset !== undefined) {
          var _bpSet = bpGetSet(preBp.breakpointsPreset);

          if (_bpSet !== false) {
            setBp(_bpSet, helpers);
          }
        } // as set
        else {
            var bpLastName; // get bpLastName

            if (preBp[1]) {
              bpLastName = preBp[1];
            } else if (preBp.breakpointsLastName) {
              bpLastName = preBp.breakpointsLastName;
            } // get bp


            if (preBp[0]) {
              setBp([preBp[0], bpLastName], helpers);
            } else if (preBp.breakpoints) {
              setBp([preBp.breakpoints, bpLastName], helpers);
            }
          }
      }
    }

    helperFunctions.setStateIsL($screen); // Initializing orientation state

    if (options && helpers.breakpoints.isInitialized) {
      helperFunctions.setStateScreen($screen, options);
    }

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
export { vueWhatScreen };
