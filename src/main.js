const vueWhatScreen = {
  /* jslint browser: true */
  /* global window */

  install: Vue => {
    const queryLandscape = "(orientation: landscape)"

    const listerResize = listenerFunction =>
      window.addEventListener("resize", listenerFunction)

    const $screen = {
      helpers: {
        result: true,
        setStateIsL: () => {
          $screen.state.isL = window.matchMedia(queryLandscape).matches
        }
      },
      methods: {
        computeIsW: (sign, width) => {
          if (Number.isInteger(width)) {
            let query = ""
            switch (sign) {
              case ">":
                query = `(min-width: ${width}px)`
                break
              case ">=":
                query = `(min-width: ${width - 1}px)`
                break
              case "<":
                query = `(max-width: ${width}px)`
                break
              case "<=":
                query = `(max-width: ${width + 1}px)`
                break
              case "=":
                query = `(max-width: ${width + 1}px) and (min-width: ${width -
                  1}px)`
                break
              default:
                break
            }
            if (query !== "") {
              return window.matchMedia(query).matches
            }
          }
          return false
        },
        computeIsH: (sign, height) => {
          if (Number.isInteger(height)) {
            let query = ""
            switch (sign) {
              case ">":
                query = `(min-height: ${height}px)`
                break
              case ">=":
                query = `(min-height: ${height - 1}px)`
                break
              case "<":
                query = `(max-height: ${height}px)`
                break
              case "<=":
                query = `(max-height: ${height + 1}px)`
                break
              case "=":
                query = `(max-height: ${height +
                  1}px) and (min-height: ${height - 1}px)`
                break
              default:
                break
            }
            if (query !== "") {
              return window.matchMedia(query).matches
            }
          }
          return false
        }
      },
      state: {
        isL: undefined
      },
      init: () => {
        console.log("Now `init()` is unnessary")
        $screen.helpers.result = true
        return $screen
      },
      isW: (sign, width) => {
        $screen.helpers.result *= $screen.methods.computeIsW(sign, width)
        return $screen
      },
      isH: (sign, height) => {
        $screen.helpers.result *= $screen.methods.computeIsH(sign, height)
        return $screen
      },
      isL: () => {
        $screen.helpers.result *= $screen.state.isL
        return $screen
      },
      isP: () => {
        $screen.helpers.result *= !$screen.state.isL
        return $screen
      },
      done: () => {
        const result = $screen.helpers.result
        $screen.helpers.result = true
        return result
      },
      not: () => {
        const result = $screen.helpers.result
        $screen.helpers.result = true
        return !result
      }
    }
    $screen.helpers.setStateIsL() // Initialise state
    listerResize($screen.helpers.setStateIsL)

    Vue.prototype.$screen = $screen
  }
}

export default vueWhatScreen
