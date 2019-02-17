import { PluginObject } from "vue";
declare type voidFunction = () => void;
export interface IScreen {
    version: string;
    muf: voidFunction[];
    setF: (f: voidFunction) => void;
}
declare const vueWhatScreen: PluginObject<{}>;
export default vueWhatScreen;
