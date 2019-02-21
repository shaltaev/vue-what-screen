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

export interface IScreen {
  helpers: {
    result: boolean
    setStateIsL: () => void
    breakpoints: {
      isInitialised: boolean
      arrNames: string[]
      arrP: number[]
      arrL: number[]
    }
    setStateScreen: () => void
  }
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

const vueWhatScreen: PluginObject<IOptions> = {
  install: (vue, options) => {
    const $screen: IScreen = {
      helpers: {
        result: true,
        setStateIsL: () => {
          $screen.state.isL = window.matchMedia(
            "(orientation: landscape)"
          ).matches
        },
        breakpoints: {
          isInitialised: false,
          arrNames: [],
          arrP: [],
          arrL: []
        },
        setStateScreen: () => {
          if (options && $screen.helpers.breakpoints.isInitialised) {
            let end = false
            let targetArr

            if ($screen.state.isL === true) {
              targetArr = $screen.helpers.breakpoints.arrL
            } else {
              targetArr = $screen.helpers.breakpoints.arrP
            }

            for (let cursor = 0; cursor < targetArr.length; cursor += 1) {
              const width = targetArr[cursor]
              const query = `(max-width: ${width + 1}px)`
              if (window.matchMedia(query).matches) {
                $screen.state.screen =
                  $screen.helpers.breakpoints.arrNames[cursor]
                end = true
                break
              }
            }

            if (!end) {
              if (options.breakpointsLastName === undefined) {
                $screen.state.screen = `u_${
                  $screen.helpers.breakpoints.arrNames[
                    $screen.helpers.breakpoints.arrNames.length - 1
                  ]
                }`
              } else {
                $screen.state.screen =
                  $screen.helpers.breakpoints.arrNames[
                    $screen.helpers.breakpoints.arrNames.length - 1
                  ]
              }
            }
          }
        }
      },
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
        console.log("Now `init()` is unnessary")
        $screen.helpers.result = true
        return $screen
      },
      isW: (sign, width) => {
        $screen.helpers.result =
          $screen.helpers.result && $screen.methods.computeIsW(sign, width)
        return $screen
      },
      isH: (sign, height) => {
        $screen.helpers.result =
          $screen.helpers.result && $screen.methods.computeIsH(sign, height)
        return $screen
      },
      isL: () => {
        $screen.helpers.result = $screen.helpers.result && !!$screen.state.isL
        return $screen
      },
      isP: () => {
        $screen.helpers.result = $screen.helpers.result && !$screen.state.isL
        return $screen
      },
      isScreen: screen => {
        if (
          $screen.helpers.breakpoints.isInitialised &&
          $screen.state.screen === screen
        ) {
          $screen.helpers.result = $screen.helpers.result && true
        } else {
          $screen.helpers.result = false
        }
        return $screen
      },
      isScreenAd: (sign, screen) => {
        if (
          $screen.helpers.breakpoints.isInitialised &&
          typeof $screen.state.screen === "string" &&
          $screen.helpers.breakpoints.arrNames.includes(screen)
        ) {
          const index = $screen.helpers.breakpoints.arrNames.indexOf(screen)
          const indexCurrentScreen = $screen.helpers.breakpoints.arrNames.indexOf(
            $screen.state.screen
          )

          switch (sign) {
            case ">":
              if (index > indexCurrentScreen) {
                $screen.helpers.result = $screen.helpers.result && true
              } else {
                $screen.helpers.result = false
              }
              break
            case ">=":
              if (index >= indexCurrentScreen) {
                $screen.helpers.result = $screen.helpers.result && true
              } else {
                $screen.helpers.result = false
              }
              break
            case "<":
              if (index < indexCurrentScreen) {
                $screen.helpers.result = $screen.helpers.result && true
              } else {
                $screen.helpers.result = false
              }
              break
            case "<=":
              if (index <= indexCurrentScreen) {
                $screen.helpers.result = $screen.helpers.result && true
              } else {
                $screen.helpers.result = false
              }
              break
            case "=":
              if (index === indexCurrentScreen) {
                $screen.helpers.result = $screen.helpers.result && true
              } else {
                $screen.helpers.result = false
              }
              break
            default:
              break
          }
        } else {
          $screen.helpers.result = false
        }
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

    // Initialise breackpoints
    if (options && options.breakpoints && !("breakpointsPreset" in options)) {
      if (
        validateBreakpoints(options.breakpoints, options.breakpointsLastName)
      ) {
        // eslint-disable-next-line array-callback-return
        options.breakpoints.map(item => {
          $screen.helpers.breakpoints.arrNames.push(item.name)
          if (typeof item.value === "number") {
            $screen.helpers.breakpoints.arrP.push(item.value)
            $screen.helpers.breakpoints.arrL.push(item.value)
          } else {
            $screen.helpers.breakpoints.arrP.push(item.value[0])
            $screen.helpers.breakpoints.arrL.push(item.value[1])
          }
        })
        if (options.breakpointsLastName !== undefined) {
          $screen.helpers.breakpoints.arrNames.push(options.breakpointsLastName)
        }
        $screen.helpers.breakpoints.isInitialised = true
        $screen.helpers.setStateScreen()
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
          $screen.helpers.breakpoints.arrNames.push(item.name)
          if (typeof item.value === "number") {
            $screen.helpers.breakpoints.arrP.push(item.value)
            $screen.helpers.breakpoints.arrL.push(item.value)
          } else {
            $screen.helpers.breakpoints.arrP.push(item.value[0])
            $screen.helpers.breakpoints.arrL.push(item.value[1])
          }
        })

        $screen.helpers.breakpoints.arrNames.push(preset.breakpointsLastName)

        $screen.helpers.breakpoints.isInitialised = true
        $screen.helpers.setStateScreen()
      } else {
        console.error("Initialising of BP :: Failed")
      }
    } else {
      console.error("Initialising of BP :: Failed")
    }

    $screen.helpers.setStateIsL() // Initialise orientation state

    const listenResize = (listenerFunction: () => void): void =>
      window.addEventListener("resize", listenerFunction)

    listenResize(() => {
      $screen.helpers.setStateIsL()
      if ($screen.helpers.breakpoints.isInitialised) {
        $screen.helpers.setStateScreen()
      }
    })

    vue.prototype.$screen = $screen
  }
}

export default vueWhatScreen
