import Vue from 'vue';
import App from './App.vue';

import wysiwyg from "./index.js";
Vue.use(wysiwyg, {
  hideModules: {
    bold: false
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
