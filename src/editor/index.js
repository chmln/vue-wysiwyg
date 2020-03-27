import Editr from "./Editr.vue";
import bus from 'src/editor/bus.js';
import locales from "./locales";

const localeArray = Object.values(locales);

export default {
	install: (Vue, userOptions = {}) => {
        if(userOptions.locale)
        {
            if(typeof userOptions.locale == 'string')
            {
                let userLocale = localeArray.find(
                    x => x.locale_shorthand.includes(
                        userOptions.locale.toLowerCase()
                    )
                );
                userOptions.locale = userLocale;
            }
        }
		bus.options = { ...bus.options, ...userOptions };
		Vue.component("wysiwyg", Editr);
	},

	component: Editr
}
