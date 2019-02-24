import { Sign } from "../enums-as-type/sign"
// import { assertNever } from "../enums-as-type/type-helper"

export default (sign: Sign, height: number): boolean => {
  let query = ""
  switch (sign) {
    case ">":
      query = `(min-height: ${height}px)`
      break
    case ">=":
      query = `(min-height: ${height - 1}px)`
      break
    case "<":
      query = `(max-height: ${height}px)`
      break
    case "<=":
      query = `(max-height: ${height + 1}px)`
      break
    case "=":
      query = `(max-height: ${height + 1}px) and (min-height: ${height - 1}px)`
      break
    default:
      // assertNever(sign)
      break
  }
  return window.matchMedia(query).matches
}
