/* eslint-disable import/no-extraneous-dependencies */
import "babel-polyfill"
import Vue from "vue"
import App from "./components/App.vue"
import { vueWhatScreen } from "../../dist/vue-what-screen.esm"

Vue.use(vueWhatScreen, {
  // breakpoints: [
  //   {
  //     name: "S",
  //     value: [600, 800]
  //   },
  //   {
  //     name: "M",
  //     value: [1200, 1280]
  //   },
  //   {
  //     name: "H",
  //     value: 1800
  //   }
  // ],
  // breakpoints: [{
  //   name: "S",
  //   value: [600, 800]
  // }],
  breakpoints: [["S", 600]],
  breakpointsLastName: "uH"
})

// eslint-disable-next-line no-new
new Vue({
  render: h => h(App)
}).$mount("#app")
