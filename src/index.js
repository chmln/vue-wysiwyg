import Editr from "./Editr.vue";
import bus from 'src/bus.js';

export default {
	install: (Vue, userOptions = {}) => {
		const options = {},
			defaultOptions = bus.options;

		for (const key in defaultOptions) {
			const userOpt = userOptions[key];
			options[key] = userOpt !== undefined ? userOpt : defaultOptions[key];
		}

		bus.options = options;
		Vue.component("wysiwyg", Editr);
	},

	component: Editr
}
