import "./vue-what-screen";
import { PluginObject } from "vue";
import { Sign } from "./enums/sign";
export interface IBreakpoint {
    name: string;
    value: number | [number, number];
}
export interface IOptions {
    breakpoints?: IBreakpoint[];
    breakpointsLastName?: string;
    breakpointsPreset?: string;
}
export interface IScreen {
    helpers: {
        result: boolean;
        setStateIsL: () => void;
        breakpoints: {
            isInitialised: boolean;
            arrNames: string[];
            arrP: number[];
            arrL: number[];
        };
        setStateScreen: () => void;
    };
    methods: {
        computeIsW: (sign: Sign, width: number) => boolean;
        computeIsH: (sign: Sign, height: number) => boolean;
    };
    state: {
        isL: undefined | boolean;
        screen: undefined | string;
    };
    init: () => IScreen;
    isW: (sign: Sign, width: number) => IScreen;
    isH: (sign: Sign, height: number) => IScreen;
    isL: () => IScreen;
    isP: () => IScreen;
    isScreen: (screen: string) => IScreen;
    isScreenAd: (sign: Sign, screen: string) => IScreen;
    done: () => boolean;
    not: () => boolean;
}
declare const vueWhatScreen: PluginObject<IOptions>;
export default vueWhatScreen;
