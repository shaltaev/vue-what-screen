// import validateBreakpoints from "./func/validateBreakpoints"

import checkIsH from "./func/checkIsH"
import checkIsW from "./func/checkIsW"

import { bpGetSet } from "./bp"

type XOR<T, U> = import("./enums-as-type/type-helper").XOR<T, U>

type ArrayOneOrMore<T> = import("./enums-as-type/type-helper").ArrayOneOrMore<T>

type Sign = import("./enums-as-type/sign").Sign

type BpAsObject = {
  name: string
  value: number | [number, number]
}

type BpAsArray = { 0: BpAsObject["name"]; 1: BpAsObject["value"] }

type Bp = XOR<BpAsObject, BpAsArray>

const parseBP = (bp: Bp): BpAsArray => {
  if (bp.name) {
    return [bp.name, bp.value]
  }
  if (bp[0]) {
    return bp
  }
  // assertNever(bp)
  return ["never", 0]
}

const setBp = (bp: BpSetAsArray, target: BpHelpers): void => {
  const bpOs = bp[0]

  bpOs.map(item => {
    const itemAsArr = parseBP(item)
    if (Array.isArray(itemAsArr[1])) {
      target.breakpoints.arrP.push(itemAsArr[1][0])
      target.breakpoints.arrL.push(itemAsArr[1][1])
    } else {
      target.breakpoints.arrP.push(itemAsArr[1])
      target.breakpoints.arrL.push(itemAsArr[1])
    }
    target.breakpoints.arrNames.push(itemAsArr[0])
  })

  if (typeof bp[1] !== "undefined") {
    target.breakpoints.arrNames.push(bp[1])
  } else {
    target.breakpoints.arrNames.push(
      `u_${target.breakpoints.arrNames[target.breakpoints.arrNames.length - 1]}`
    )
  }

  target.breakpoints.isInitialized = true
}

type BpSetAsObjectManual = {
  breakpoints: ArrayOneOrMore<Bp>
  breakpointsLastName?: string
}

type BpAsObjectPreset = {
  breakpointsPreset: string
}

type BpOptionsAsObject = XOR<BpSetAsObjectManual, BpAsObjectPreset>

export type BpSetAsArray = {
  0: BpSetAsObjectManual["breakpoints"]
  1?: BpSetAsObjectManual["breakpointsLastName"]
}

type BpAsPreset = BpAsObjectPreset["breakpointsPreset"]

export type BpOptions = BpAsPreset | XOR<BpOptionsAsObject, BpSetAsArray>

export type VueWhatScreenPluginOptions = XOR<
  {
    bp: BpOptions
  },
  BpOptionsAsObject
>

type BpHelpers = {
  result: boolean

  breakpoints: {
    isInitialized: boolean
    arrNames: string[]
    arrP: number[]
    arrL: number[]
  }
}

type HelperFunctions = {
  setStateIsL: ($screen: Screen) => void
  setStateScreen: ($screen: Screen, options: VueWhatScreenPluginOptions) => void
}

export type Screen = {
  methods: {
    computeIsW: (sign: Sign, width: number) => boolean
    computeIsH: (sign: Sign, height: number) => boolean
  }
  state: {
    isL: undefined | boolean
    screen: undefined | string
    // helpers: BpHelpers
  }
  init: () => Screen
  isW: (sign: Sign, width: number) => Screen
  isH: (sign: Sign, height: number) => Screen
  isL: () => Screen
  isP: () => Screen
  isScreen: (screen: string) => Screen
  isScreenAd: (sign: Sign, screen: string) => Screen
  done: () => boolean
  not: () => boolean
}

export type IScreen = Screen // Added for backward compatibility

const helpers: BpHelpers = {
  result: true,

  breakpoints: {
    isInitialized: false,
    arrNames: [],
    arrP: [],
    arrL: []
  }
}

const helperFunctions: HelperFunctions = {
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

const vueWhatScreen: import("vue").PluginObject<VueWhatScreenPluginOptions> = {
  install: (vue, options) => {
    const $screen: Screen = {
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
        //   helpers
      },
      init: () => {
        // console.log("Now `init()` is unnecessary")
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

    if (options) {
      let preBp: BpOptions | undefined
      if (options.bp) {
        preBp = options.bp
      } else if (options.breakpoints) {
        preBp = [options.breakpoints, options.breakpointsLastName]
      } else if (options.breakpointsPreset) {
        preBp = options.breakpointsPreset
      } else {
        preBp = undefined
      }

      // as preset
      if (typeof preBp !== "undefined") {
        if (typeof preBp === "string") {
          const bpSet = bpGetSet(preBp)
          if (bpSet !== false) {
            setBp(bpSet, helpers)
          }
        } else if (preBp.breakpointsPreset !== undefined) {
          const bpSet = bpGetSet(preBp.breakpointsPreset)
          if (bpSet !== false) {
            setBp(bpSet, helpers)
          }
        }
        // as set
        else {
          let bpLastName: string | undefined
          // get bpLastName
          if (preBp[1]) {
            bpLastName = preBp[1]
          } else if (preBp.breakpointsLastName) {
            bpLastName = preBp.breakpointsLastName
          }
          // get bp
          if (preBp[0]) {
            setBp([preBp[0], bpLastName], helpers)
          } else if (preBp.breakpoints) {
            setBp([preBp.breakpoints, bpLastName], helpers)
          }
        }
      }
    }

    helperFunctions.setStateIsL($screen) // Initializing orientation state
    if (options && helpers.breakpoints.isInitialized) {
      helperFunctions.setStateScreen($screen, options)
    }

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

export { vueWhatScreen }
