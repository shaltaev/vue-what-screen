/* eslint-disable import/no-extraneous-dependencies */
import "babel-polyfill"
import Vue from "vue"
import App from "./components/App.vue"
import { vueWhatScreen } from "../../dist/vue-what-screen.esm"

Vue.use(vueWhatScreen)

// eslint-disable-next-line no-new
new Vue({
  render: h => h(App)
}).$mount("#app")
