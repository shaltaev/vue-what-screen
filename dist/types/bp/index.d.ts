import { IOptions, IBreakpoint } from "src/main";
export interface IResBp extends IOptions {
    breakpoints: IBreakpoint[];
    breakpointsLastName: string;
}
declare const _default: (presetName: string) => false | IResBp;
export default _default;
