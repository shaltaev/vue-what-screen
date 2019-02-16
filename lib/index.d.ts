import Vue from "vue";
export interface IVueWhatScreenOptions {
    version: "0.0.0";
}
declare class VueWhatScreen {
    install(vueInstance: Vue, options: IVueWhatScreenOptions): void;
}
export default VueWhatScreen;
