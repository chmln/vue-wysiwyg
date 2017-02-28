<template lang="pug">
div(@mousedown="onBtnClick", @exec="onExec(arguments[0])")
	a(:class="'vw-btn-'+module.name")
		i(:class="module.icon", v-if="module.icon")

	.dashboard(
		v-if="module.$mount",
		v-show="showDashboard",
		ref="dashboard"
	)
		div(ref="moduleDashboard")

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
				this.module.$mount &&
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
	},

	mounted () {
		if (this.module.$mount) {
			this.module.$on("exec", this.onExec);
			this.module.$mount(this.$refs.moduleDashboard);
		}
	}
}
</script>
