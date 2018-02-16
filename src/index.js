import Editr from "./Editr.vue";
import bus from 'src/bus.js';

export default {
	install: (Vue, userOptions = {}) => {
		bus.options = { ...bus.options, ...userOptions };
    Vue.component("wysiwyg", Editr);
    Vue.prototype.$wysiwygEventDestructors = [];
    Vue.prototype.$wysiwygOn = function (event, handler) {
      this.$wysiwygEventDestructors.push(bus.on(event, handler));

    };
    Vue.mixin({
      destroyed() {
        this.$wysiwygEventDestructors.forEach((fn) => {
          fn();
        });
        this.$wysiwygEventDestructors.splice(0, this.$wysiwygEventDestructors.length);
      }
    });
	},

	component: Editr
}
