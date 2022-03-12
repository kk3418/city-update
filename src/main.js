import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  created() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id:
          "513374919811-20gi47snsc0vds9dvv1g9fr8leesn5o2.apps.googleusercontent.com",
        scope: "profile email",
      });
    });
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
