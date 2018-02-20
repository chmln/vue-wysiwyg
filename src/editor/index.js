import Editr from "./Editr.vue";
import bus from 'src/editor/bus.js';

export default {
	install: (Vue, userOptions = {}) => {
		bus.options = { ...bus.options, ...userOptions };
		Vue.component("wysiwyg", Editr);
	},

	component: Editr
}
