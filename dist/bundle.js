var vueWhatScreen = {
  /* jslint browser: true */

  /* global window */
  install: function install(Vue) {
    var queryLandscape = "(orientation: landscape)";
    var $screen = {
      result: true,
      init: function init() {
        $screen.result = true;
        return $screen;
      },
      isL: function isL() {
        $screen.result *= window.matchMedia(queryLandscape).matches;
        return $screen;
      },
      isP: function isP() {
        $screen.result *= !window.matchMedia(queryLandscape).matches;
        return $screen;
      },
      done: function done() {
        return $screen.result;
      },
      not: function not() {
        return !$screen.result;
      }
    };
    Vue.prototype.$screen = $screen;
  }
};

export default vueWhatScreen;
