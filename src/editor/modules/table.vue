<template>
    <form @submit.prevent="insertTable" class="form">
        <label>
            <div>Rows</div>
            <input type="number" style="width: 60px"  min="2" v-model="rows">
        </label>
        <label>
            <div>Columns</div>
            <input type="number" style="width: 60px"  min="2" v-model="cols">
        </label>

        <button type="submit">Insert</button>
    </form>
</template>

<script>
// import bus from 'src/editor/bus.js';

export default {
    title: "table",
    description: "Insert Table",
    icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"/></svg>',

    data(){
        return {
            rows: 2,
            cols: 2
        }
    },
    methods: {
        insertTable(){
            const rows = (
              "<tr>" + "<td></td>".repeat(this.cols) + "</tr>"
            ).repeat(this.rows);

            this.$emit("exec", "insertHTML", `<table><tbody>${rows}</tbody></table>`);
            this.$parent.closeDashboard()

        }
    }
};

</script>
<style lang="stylus" scoped>
.form
  display: flex;
  align-content: flex-end;

  label
    margin-right 1rem

</style>
