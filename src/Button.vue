<template>
  <a :class="'vw-btn-'+module.title" tabindex="-1"
    @mousedown="onBtnClick" v-html="module.icon"></a>
</template>
<script>
import bus from 'src/bus.js';

export default {
	props: ["module", "options"],

	data () {
		return {
			showDashboard: false,
		}
	},

  computed: {
    uid () {
      return this.$parent._uid
    }
  },

	methods: {
		closeDashboard () {
      this.showDashboard = false;
      // this.$emit('close');
		},

		openDashboard () {

      this.showDashboard = true;
      const modalOptions = {
        component: this.module,
        title: this.module.dialogTitle || this.module.title,
        small: this.module.dialogSize == 'small',
        large: this.module.dialogSize == 'large',
        componentOptions: {
          options: this.options
        }
      };
      if (this.module.modalButtons) {
        modalOptions.buttons = this.module.modalButtons;
      }
      this.$emit('open', modalOptions);
		},

    exec (...args) {
      this.$emit('exec', ...args);
    },

		onBtnClick() {
      if (this.module.render) {
        this.openDashboard();
      }else {

        let action = this.module.action;
        let arg = this.module.actionArgs;

        if (action)
          this.exec(action, arg, false);
      }

		}
	}
}
</script>
