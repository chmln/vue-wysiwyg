import Vue from 'vue';
import App from './App.vue';

import Editr from "./index.js";
Vue.use(Editr);

new Vue({
  el: '#app',
  render: h => h(App)
})
