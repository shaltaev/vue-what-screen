import { IOptions, IBreakpoint } from "../.";
export interface IResBp extends IOptions {
    breakpoints: IBreakpoint[];
    breakpointsLastName: string;
}
declare const _default: (presetName: string) => false | IResBp;
export default _default;
