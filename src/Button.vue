<template lang="pug">
div(@mousedown="onBtnClick")
	a(:class="'vw-btn-'+module.title", v-html="module.icon")

	.dashboard(
		v-show="showDashboard",
		ref="dashboard"
	)
		component(
      v-if="module.render",
      v-once,
      ref="moduleDashboard",
      :is="module",
      @exec="exec",
      :uid="uid"
    )

</template>
<script>
import bus from 'src/bus.js';

export default {
	props: ["module"],

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
		},

		openDashboard () {
			this.showDashboard = true;
		},

    exec (...args) {
      this.$parent.exec(...args)
    },

		onBtnClick($event, action, arg) {
			if (
				this.module.render &&
				(!this.$refs.dashboard || !this.$refs.dashboard.contains($event.target))
			) {
				this.showDashboard = !this.showDashboard;
				bus.emit(`${this.uid}_${this.showDashboard ? "show" : "hide"}_dashboard_${this.module.title}`);
				return;
			}

			action = action || this.module.action;
			arg = arg || this.module.actionArgs;

			if (action)
				this.$parent.exec(action, arg);
		}
	}
}
</script>
