import Vue from "vue";
import bus from "../bus.js";
export default new Vue({
    template: `
        <form @submit.prevent="insertLink">
            <label>
                URL
                <input ref="url" type="text" style="width: 40%" v-model="url">
            </label>
            <label>
                Link Title
                <input type="text" style="width: 40%" v-model="title">
            </label>

            <button type="submit">Insert</button>
        </form>
    `,


    data(){
        return {
            name: "link",
            icon: "fa fa-link",
            url: "",
            title: ""
        }
    },
    methods: {
        insertLink(){
            this.$emit("exec", "insertHTML", `<a href='${this.url}'>${this.title}</a>`);
            this.url = "";
            this.title = "";
        }
    },

    created () {
        bus.$on("show_dashboard_link", () => {
            this.$nextTick(() => {
                this.$refs.url.focus();
            });
        });
    }
});

