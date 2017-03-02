import Editr from "./Editr.vue";
import bus from "./bus.js";

export default {
	install: (Vue, options) => {
		Vue.component("Editr", Editr);
		bus.$set(bus.$data, "options", options);
	}

}
