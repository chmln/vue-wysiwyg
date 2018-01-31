import Vue from 'vue';
import App from './App.vue';

import wysiwyg from "./index.js";
Vue.use(wysiwyg, {
  hideModules: { "bold": true },
  image: {
    uploadURL: "http://localhost:3000/profile",
    imageResKey: "url",
    dropzoneOptions: {}
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
