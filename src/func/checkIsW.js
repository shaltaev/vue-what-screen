export default (sign, width) => {
  /* jslint browser: true */
  /* global window */
  if (Number.isInteger(width)) {
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
        break
    }
    if (query !== "") {
      return window.matchMedia(query).matches
    }
  }
  return false
}
