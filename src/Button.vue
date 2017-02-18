<template lang="pug">
div(@click="exec", @exec="onExec(arguments[0])")
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
export default {
	props: ["module"],

	data () {
		return {
			showDashboard: false
		}
	},

	methods: {
		exec($event, action, arg) {
			action = action || this.module.action;

			if (action)
				this.$parent.exec(action, arg);

			else if (
				this.module.$mount && $event &&
				(!this.$refs.dashboard || !this.$refs.dashboard.contains($event.target))
			)
				this.showDashboard = !this.showDashboard;
		},

		onExec (cmd, args) {
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
