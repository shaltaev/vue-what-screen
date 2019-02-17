import { PluginObject, PluginFunction, VueConstructor } from "vue"

// const queryLandscape = "(orientation: landscape)"
// const queryPortrait = "(orientation: portrait)"

type voidFunction = () => void

export interface IScreen {
  version: string
  muf: voidFunction[]
  setF: (f: voidFunction) => void
}

const installFunction: PluginFunction<{}> = (
  vueConstructorInstance: VueConstructor
  // options
) => {
  const scr: IScreen = {
    version: "0.0.0",
    muf: [],
    setF(f: voidFunction) {
      this.muf.push(f)
    }
  }
  vueConstructorInstance.prototype.$screen = scr
}

const vueWhatScreen: PluginObject<{}> = {
  install: installFunction,
  options: {}
}

export default vueWhatScreen
