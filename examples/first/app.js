/* eslint-disable import/no-extraneous-dependencies */
import "babel-polyfill"
import Vue from "vue"
import App from "./components/App.vue"

// eslint-disable-next-line no-new
new Vue({
  render: h => h(App)
}).$mount("#app")
