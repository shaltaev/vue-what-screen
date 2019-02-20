export default (sign, height) => {
  /* jslint browser: true */
  /* global window */
  if (Number.isInteger(height)) {
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
        query = `(max-height: ${height + 1}px) and (min-height: ${height -
          1}px)`
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
