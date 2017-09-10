import Editr from "./Editr.vue";
import bus from 'src/bus.js';

export default {
	install: (Vue, userOptions = {}) => {
		bus.options = { ...bus.options, userOptions };
		Vue.component("wysiwyg", Editr);
	},

	component: Editr
}
