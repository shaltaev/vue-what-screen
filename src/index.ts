import Vue from "vue"

export interface IVueWhatScreenOptions {
  version: "0.0.0"
}

class VueWhatScreen {
  public install(vueInstance: Vue, options: IVueWhatScreenOptions) {}
}

export default VueWhatScreen
