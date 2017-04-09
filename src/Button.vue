<template lang="pug">
div(@mousedown="onBtnClick", @exec="onExec(arguments[0])")
	a(:class="'vw-btn-'+module.name", v-html="module.icon")

	.dashboard(
		v-show="showDashboard",
		ref="dashboard"
	)
		component(v-if="module.render", v-once, ref="moduleDashboard", :is="module")

</template>
<script>
import bus from "./bus.js";

export default {
	props: ["module"],

	data () {
		return {
			showDashboard: false
		}
	},

	methods: {
		closeDashboard () {
			this.showDashboard = false;
		},

		openDashboard () {
			this.showDashboard = true;
		},

		onBtnClick($event, action, arg) {
			$event.preventDefault();

			this.$parent.saveSelection();
			if (
				this.module.render &&
				(!this.$refs.dashboard || !this.$refs.dashboard.contains($event.target))
			) {
				this.showDashboard = !this.showDashboard;
				bus.$emit((this.showDashboard ? "show" : "hide") + "_dashboard_" + this.module.name);
				return;
			}

			action = action || this.module.action;
			arg = arg || this.module.actionArgs;

			if (action)
				this.$parent.exec(action, arg);
		},

		onExec (cmd, args) {
			this.$parent.restoreSelection();
			this.$emit('exec', cmd, args);
			this.showDashboard = false;
		}
	}
}
</script>
