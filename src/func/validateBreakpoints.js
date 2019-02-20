export default (bp, bpLastName) => {
  const arrP = []
  const arrL = []
  const arrNames = []
  if (Array.isArray(bp) && bp.length > 0) {
    const validateAndPush = bp.map(item => {
      let result
      // Check that item has right structure
      if (
        typeof item === "object" &&
        "name" in item &&
        "value" in item &&
        typeof item.name === "string" &&
        (typeof item.value === "number" ||
          (Array.isArray(item.value) &&
            item.value.length === 2 &&
            typeof item.value[0] === "number" &&
            typeof item.value[1] === "number"))
      ) {
        arrNames.push(item.name)

        if (typeof item.value === "number") {
          arrP.push(item.value)
          arrL.push(item.value)
        } else {
          arrP.push(item.value[0])
          arrL.push(item.value[1])
        }
        result = true
      } else {
        result = false
      }
      return result
    })

    // Check all true in validateAndPush
    // eslint-disable-next-line no-restricted-syntax
    for (const val in validateAndPush) {
      if (validateAndPush[val] === false) {
        return false
      }
    }

    // Check that all names in arrNames is uniq
    if (bpLastName !== undefined && typeof bpLastName === "string") {
      arrNames.push(bpLastName)
    }
    const uniqNames = [...new Set(arrNames)]
    if (uniqNames.length !== arrNames.length) return false

    // Check that arrP and arrL in ASC Order
    for (let i = 1; i < arrP.length; i += 1) {
      if (arrL[i - 1] > arrL[i]) {
        return false
      }
      if (arrP[i - 1] > arrP[i]) {
        return false
      }
      return true
    }
  }
  return false
}
