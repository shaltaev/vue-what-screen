const vueWhatScreen = {
  /* jslint browser: true */
  /* global window */

  install: Vue => {
    const queryLandscape = "(orientation: landscape)"

    const $screen = {
      result: true,
      init: () => {
        $screen.result = true
        return $screen
      },
      isL: () => {
        $screen.result *= window.matchMedia(queryLandscape).matches
        return $screen
      },
      isP: () => {
        $screen.result *= !window.matchMedia(queryLandscape).matches
        return $screen
      },
      done: () => $screen.result,
      not: () => !$screen.result
    }

    Vue.prototype.$screen = $screen
  }
}

export default vueWhatScreen
