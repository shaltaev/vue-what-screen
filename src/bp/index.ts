import BS3 from "./Bootstrap3"
import BS4 from "./Bootstrap4"
import F6 from "./Foundation6"

type BpSetAsArray = import("../.").BpSetAsArray

const bpGetSet = (presetName: string): BpSetAsArray | false => {
  switch (presetName) {
    case "Bootstrap3":
    case "BS3":
      return BS3

    case "Bootstrap":
    case "BS":
    case "Bootstrap4":
    case "BS4":
      return BS4

    case "Foundation":
    case "F":
    case "Foundation6":
    case "F6":
      return F6

    default:
      return false
  }
}

export default bpGetSet

export { bpGetSet }
