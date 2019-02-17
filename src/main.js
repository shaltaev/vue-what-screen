const vueWhatScreen = {
  install: (Vue, options) => {
    Vue.prototype.$screen = {}
    console.log(options)
  }
}

export default vueWhatScreen
