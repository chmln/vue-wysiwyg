import Vue from "vue";

export default new Vue({
    template: `
    <div>
        <button @click="insertHeading">H1</button>
        <button @click="insertHeading">H2</button>
        <button @click="insertHeading">H3</button>
    </div>
    `,


    data(){
        return {
            name: "header",
            icon: "fa fa-header"
        }
    },
    methods: {
        insertHeading(e){
            this.$emit("exec", "formatBlock", e.target.textContent);
        }
    }
});

