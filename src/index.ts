import validateBreakpoints from "./func/validateBreakpoints"

import checkIsH from "./func/checkIsH"
import checkIsW from "./func/checkIsW"

import breakpointsPreset from "./bp"

import { PluginObject } from "vue"

import { Sign } from "./enums/sign"

export interface IBreakpoint {
  name: string
  value: number | [number, number]
}
export interface IOptions {
  breakpoints?: IBreakpoint[]
  breakpointsLastName?: string
  breakpointsPreset?: string
}

interface IHelpers {
  result: boolean

  breakpoints: {
    isInitialized: boolean
    arrNames: string[]
    arrP: number[]
    arrL: number[]
  }
}

interface IHelperFunctions {
  setStateIsL: ($screen: IScreen) => void
  setStateScreen: ($screen: IScreen, options: IOptions) => void
}
export interface IScreen {
  methods: {
    computeIsW: (sign: Sign, width: number) => boolean
    computeIsH: (sign: Sign, height: number) => boolean
  }
  state: {
    isL: undefined | boolean
    screen: undefined | string
  }
  init: () => IScreen
  isW: (sign: Sign, width: number) => IScreen
  isH: (sign: Sign, height: number) => IScreen
  isL: () => IScreen
  isP: () => IScreen
  isScreen: (screen: string) => IScreen
  isScreenAd: (sign: Sign, screen: string) => IScreen
  done: () => boolean
  not: () => boolean
}

const helpers: IHelpers = {
  result: true,

  breakpoints: {
    isInitialized: false,
    arrNames: [],
    arrP: [],
    arrL: []
  }
}

const helperFunctions: IHelperFunctions = {
  setStateIsL: $screen => {
    $screen.state.isL = window.matchMedia("(orientation: landscape)").matches
  },
  setStateScreen: ($screen, options) => {
    if (options && helpers.breakpoints.isInitialized) {
      let end = false
      let targetArr

      if ($screen.state.isL === true) {
        targetArr = helpers.breakpoints.arrL
      } else {
        targetArr = helpers.breakpoints.arrP
      }

      for (let cursor = 0; cursor < targetArr.length; cursor += 1) {
        const width = targetArr[cursor]
        const query = `(max-width: ${width + 1}px)`
        if (window.matchMedia(query).matches) {
          $screen.state.screen = helpers.breakpoints.arrNames[cursor]
          end = true
          break
        }
      }

      if (!end) {
        if (options.breakpointsLastName === undefined) {
          $screen.state.screen = `u_${
            helpers.breakpoints.arrNames[
              helpers.breakpoints.arrNames.length - 1
            ]
          }`
        } else {
          $screen.state.screen =
            helpers.breakpoints.arrNames[
              helpers.breakpoints.arrNames.length - 1
            ]
        }
      }
    }
  }
}

const vueWhatScreen: PluginObject<IOptions> = {
  install: (vue, options) => {
    const $screen: IScreen = {
      methods: {
        computeIsW: (sign, width) => {
          return checkIsW(sign, width)
        },
        computeIsH: (sign, height) => {
          return checkIsH(sign, height)
        }
      },
      state: {
        isL: undefined,
        screen: undefined
      },
      init: () => {
        console.log("Now `init()` is unnecessary")
        helpers.result = true
        return $screen
      },
      isW: (sign, width) => {
        helpers.result =
          helpers.result && $screen.methods.computeIsW(sign, width)
        return $screen
      },
      isH: (sign, height) => {
        helpers.result =
          helpers.result && $screen.methods.computeIsH(sign, height)
        return $screen
      },
      isL: () => {
        helpers.result = helpers.result && !!$screen.state.isL
        return $screen
      },
      isP: () => {
        helpers.result = helpers.result && !$screen.state.isL
        return $screen
      },
      isScreen: screen => {
        if (
          helpers.breakpoints.isInitialized &&
          $screen.state.screen === screen
        ) {
          helpers.result = helpers.result && true
        } else {
          helpers.result = false
        }
        return $screen
      },
      isScreenAd: (sign, screen) => {
        if (
          helpers.breakpoints.isInitialized &&
          typeof $screen.state.screen === "string" &&
          helpers.breakpoints.arrNames.includes(screen)
        ) {
          const index = helpers.breakpoints.arrNames.indexOf(screen)
          const indexCurrentScreen = helpers.breakpoints.arrNames.indexOf(
            $screen.state.screen
          )

          switch (sign) {
            case ">":
              if (index > indexCurrentScreen) {
                helpers.result = helpers.result && true
              } else {
                helpers.result = false
              }
              break
            case ">=":
              if (index >= indexCurrentScreen) {
                helpers.result = helpers.result && true
              } else {
                helpers.result = false
              }
              break
            case "<":
              if (index < indexCurrentScreen) {
                helpers.result = helpers.result && true
              } else {
                helpers.result = false
              }
              break
            case "<=":
              if (index <= indexCurrentScreen) {
                helpers.result = helpers.result && true
              } else {
                helpers.result = false
              }
              break
            case "=":
              if (index === indexCurrentScreen) {
                helpers.result = helpers.result && true
              } else {
                helpers.result = false
              }
              break
            default:
              break
          }
        } else {
          helpers.result = false
        }
        return $screen
      },
      done: () => {
        const result = helpers.result
        helpers.result = true
        return result
      },
      not: () => {
        const result = helpers.result
        helpers.result = true
        return !result
      }
    }

    // Initializing breakpoints
    if (options && options.breakpoints && !("breakpointsPreset" in options)) {
      if (
        validateBreakpoints(options.breakpoints, options.breakpointsLastName)
      ) {
        // eslint-disable-next-line array-callback-return
        options.breakpoints.map(item => {
          helpers.breakpoints.arrNames.push(item.name)
          if (typeof item.value === "number") {
            helpers.breakpoints.arrP.push(item.value)
            helpers.breakpoints.arrL.push(item.value)
          } else {
            helpers.breakpoints.arrP.push(item.value[0])
            helpers.breakpoints.arrL.push(item.value[1])
          }
        })
        if (options.breakpointsLastName !== undefined) {
          helpers.breakpoints.arrNames.push(options.breakpointsLastName)
        }
        helpers.breakpoints.isInitialized = true
        helperFunctions.setStateScreen($screen, options)
      }
    } else if (options && options.breakpointsPreset) {
      if ("breakpoints" in options) {
        console.info("options.breakpoints will be ignored")
      }
      if ("breakpointsLastName" in options) {
        console.info("options.breakpointsLastName will be ignored")
      }
      const preset = breakpointsPreset(options.breakpointsPreset)
      if (preset !== false) {
        // eslint-disable-next-line array-callback-return
        preset.breakpoints.map(item => {
          helpers.breakpoints.arrNames.push(item.name)
          if (typeof item.value === "number") {
            helpers.breakpoints.arrP.push(item.value)
            helpers.breakpoints.arrL.push(item.value)
          } else {
            helpers.breakpoints.arrP.push(item.value[0])
            helpers.breakpoints.arrL.push(item.value[1])
          }
        })

        helpers.breakpoints.arrNames.push(preset.breakpointsLastName)

        helpers.breakpoints.isInitialized = true
        helperFunctions.setStateScreen($screen, options)
      } else {
        console.error("Initializing of BP :: Failed")
      }
    } else {
      console.error("Initializing of BP :: Failed")
    }

    helperFunctions.setStateIsL($screen) // Initializing orientation state

    const listenResize = (listenerFunction: () => void): void =>
      window.addEventListener("resize", listenerFunction)

    listenResize(() => {
      helperFunctions.setStateIsL($screen)
      if (options && helpers.breakpoints.isInitialized) {
        helperFunctions.setStateScreen($screen, options)
      }
    })

    vue.prototype.$screen = $screen
  }
}

export default vueWhatScreen
