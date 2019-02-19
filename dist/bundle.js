var vueWhatScreen = {
  /* jslint browser: true */

  /* global window */
  install: function install(Vue) {
    var queryLandscape = "(orientation: landscape)";

    var listerResize = function listerResize(listenerFunction) {
      return window.addEventListener("resize", listenerFunction);
    };

    var $screen = {
      helpers: {
        result: true,
        setStateIsL: function setStateIsL() {
          $screen.state.isL = window.matchMedia(queryLandscape).matches;
        }
      },
      methods: {
        computeIsW: function computeIsW(sign, width) {
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
        },
        computeIsH: function computeIsH(sign, height) {
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
        }
      },
      state: {
        isL: undefined
      },
      init: function init() {
        console.log("Now `init()` is unnessary");
        $screen.helpers.result = true;
        return $screen;
      },
      isW: function isW(sign, width) {
        $screen.helpers.result *= $screen.methods.computeIsW(sign, width);
        return $screen;
      },
      isH: function isH(sign, height) {
        $screen.helpers.result *= $screen.methods.computeIsH(sign, height);
        return $screen;
      },
      isL: function isL() {
        $screen.helpers.result *= $screen.state.isL;
        return $screen;
      },
      isP: function isP() {
        $screen.helpers.result *= !$screen.state.isL;
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
      }
    };
    $screen.helpers.setStateIsL(); // Initialise state

    listerResize($screen.helpers.setStateIsL);
    Vue.prototype.$screen = $screen;
  }
};

export default vueWhatScreen;
