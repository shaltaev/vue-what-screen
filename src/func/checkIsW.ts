import { Sign } from "../enums-as-type/sign"
// import { assertNever } from "../enums-as-type/type-helper"

export default (sign: Sign, width: number): boolean => {
  let query = ""
  switch (sign) {
    case ">":
      query = `(min-width: ${width}px)`
      break
    case ">=":
      query = `(min-width: ${width - 1}px)`
      break
    case "<":
      query = `(max-width: ${width}px)`
      break
    case "<=":
      query = `(max-width: ${width + 1}px)`
      break
    case "=":
      query = `(max-width: ${width + 1}px) and (min-width: ${width - 1}px)`
      break
    default:
      // assertNever(sign)
      break
  }
  return window.matchMedia(query).matches
}
