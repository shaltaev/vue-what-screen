var vueWhatScreen = {
  install: function install(Vue, options) {
    Vue.prototype.$screen = {};
    console.log(options);
  }
};

export default vueWhatScreen;
