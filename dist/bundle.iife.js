var VueWhatScreen = (function () {
  'use strict';

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

  var vueWhatScreen = {
    install: function install(vue, options) {
      var $screen = {
        helpers: {
          result: true,
          setStateIsL: function setStateIsL() {
            $screen.state.isL = window.matchMedia("(orientation: landscape)").matches;
          },
          breakpoints: {
            isInitialised: false,
            arrNames: [],
            arrP: [],
            arrL: []
          },
          setStateScreen: function setStateScreen() {
            if (options && $screen.helpers.breakpoints.isInitialised) {
              var end = false;
              var targetArr;

              if ($screen.state.isL === true) {
                targetArr = $screen.helpers.breakpoints.arrL;
              } else {
                targetArr = $screen.helpers.breakpoints.arrP;
              }

              for (var cursor = 0; cursor < targetArr.length; cursor += 1) {
                var width = targetArr[cursor];
                var query = "(max-width: ".concat(width + 1, "px)");

                if (window.matchMedia(query).matches) {
                  $screen.state.screen = $screen.helpers.breakpoints.arrNames[cursor];
                  end = true;
                  break;
                }
              }

              if (!end) {
                if (options.breakpointsLastName === undefined) {
                  $screen.state.screen = "u_".concat($screen.helpers.breakpoints.arrNames[$screen.helpers.breakpoints.arrNames.length - 1]);
                } else {
                  $screen.state.screen = $screen.helpers.breakpoints.arrNames[$screen.helpers.breakpoints.arrNames.length - 1];
                }
              }
            }
          }
        },
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
          console.log("Now `init()` is unnessary");
          $screen.helpers.result = true;
          return $screen;
        },
        isW: function isW(sign, width) {
          $screen.helpers.result = $screen.helpers.result && $screen.methods.computeIsW(sign, width);
          return $screen;
        },
        isH: function isH(sign, height) {
          $screen.helpers.result = $screen.helpers.result && $screen.methods.computeIsH(sign, height);
          return $screen;
        },
        isL: function isL() {
          $screen.helpers.result = $screen.helpers.result && !!$screen.state.isL;
          return $screen;
        },
        isP: function isP() {
          $screen.helpers.result = $screen.helpers.result && !$screen.state.isL;
          return $screen;
        },
        isScreen: function isScreen(screen) {
          if ($screen.helpers.breakpoints.isInitialised && $screen.state.screen === screen) {
            $screen.helpers.result = $screen.helpers.result && true;
          } else {
            $screen.helpers.result = false;
          }

          return $screen;
        },
        isScreenAd: function isScreenAd(sign, screen) {
          if ($screen.helpers.breakpoints.isInitialised && typeof $screen.state.screen === "string" && $screen.helpers.breakpoints.arrNames.includes(screen)) {
            var index = $screen.helpers.breakpoints.arrNames.indexOf(screen);
            var indexCurrentScreen = $screen.helpers.breakpoints.arrNames.indexOf($screen.state.screen);

            switch (sign) {
              case ">":
                if (index > indexCurrentScreen) {
                  $screen.helpers.result = $screen.helpers.result && true;
                } else {
                  $screen.helpers.result = false;
                }

                break;

              case ">=":
                if (index >= indexCurrentScreen) {
                  $screen.helpers.result = $screen.helpers.result && true;
                } else {
                  $screen.helpers.result = false;
                }

                break;

              case "<":
                if (index < indexCurrentScreen) {
                  $screen.helpers.result = $screen.helpers.result && true;
                } else {
                  $screen.helpers.result = false;
                }

                break;

              case "<=":
                if (index <= indexCurrentScreen) {
                  $screen.helpers.result = $screen.helpers.result && true;
                } else {
                  $screen.helpers.result = false;
                }

                break;

              case "=":
                if (index === indexCurrentScreen) {
                  $screen.helpers.result = $screen.helpers.result && true;
                } else {
                  $screen.helpers.result = false;
                }

                break;

              default:
                break;
            }
          } else {
            $screen.helpers.result = false;
          }

          return $screen;
        },
        done: function done() {
          var result = $screen.helpers.result;
          $screen.helpers.result = true;
          return result;
        },
        not: function not() {
          var result = $screen.helpers.result;
          $screen.helpers.result = true;
          return !result;
        } // Initialise breackpoints

      };

      if (options && options.breakpoints && !("breakpointsPreset" in options)) {
        if (validateBreakpoints(options.breakpoints, options.breakpointsLastName)) {
          // eslint-disable-next-line array-callback-return
          options.breakpoints.map(function (item) {
            $screen.helpers.breakpoints.arrNames.push(item.name);

            if (typeof item.value === "number") {
              $screen.helpers.breakpoints.arrP.push(item.value);
              $screen.helpers.breakpoints.arrL.push(item.value);
            } else {
              $screen.helpers.breakpoints.arrP.push(item.value[0]);
              $screen.helpers.breakpoints.arrL.push(item.value[1]);
            }
          });

          if (options.breakpointsLastName !== undefined) {
            $screen.helpers.breakpoints.arrNames.push(options.breakpointsLastName);
          }

          $screen.helpers.breakpoints.isInitialised = true;
          $screen.helpers.setStateScreen();
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
            $screen.helpers.breakpoints.arrNames.push(item.name);

            if (typeof item.value === "number") {
              $screen.helpers.breakpoints.arrP.push(item.value);
              $screen.helpers.breakpoints.arrL.push(item.value);
            } else {
              $screen.helpers.breakpoints.arrP.push(item.value[0]);
              $screen.helpers.breakpoints.arrL.push(item.value[1]);
            }
          });
          $screen.helpers.breakpoints.arrNames.push(preset.breakpointsLastName);
          $screen.helpers.breakpoints.isInitialised = true;
          $screen.helpers.setStateScreen();
        } else {
          console.error("Initialising of BP :: Failed");
        }
      } else {
        console.error("Initialising of BP :: Failed");
      }

      $screen.helpers.setStateIsL(); // Initialise orientation state

      var listenResize = function listenResize(listenerFunction) {
        return window.addEventListener("resize", listenerFunction);
      };

      listenResize(function () {
        $screen.helpers.setStateIsL();

        if ($screen.helpers.breakpoints.isInitialised) {
          $screen.helpers.setStateScreen();
        }
      });
      vue.prototype.$screen = $screen;
    }
  };

  return vueWhatScreen;

}());
