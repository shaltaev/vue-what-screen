import Vue, { PluginObject, PluginFunction } from "vue"

export interface IVueWhatScreenOptions {
  version: string
}

const installFunction: PluginFunction<IVueWhatScreenOptions> = (
  vueInstance: typeof Vue,
  options?: IVueWhatScreenOptions
) => {
  console.log("vue-what-screen installed")
}

const vueWhatScreen: PluginObject<IVueWhatScreenOptions> = {
  install: installFunction
}

export default vueWhatScreen
