<template>
    <form @submit.prevent="insertTable">
        <label>
            rows
            <input type="number" style="width: 60px" maxlength="2" min="2" v-model="rows">
        </label>
        <label>
            cols
            <input type="number" style="width: 60px" maxlength="2" min="2" v-model="cols">
        </label>

        <button type="submit">Insert</button>
    </form>
</template>

<script>
export default {
    name: "table",
    icon: "fa fa-table",

    data(){
        return {
            rows: 2,
            cols: 2
        }
    },
    methods: {
        insertTable(){
            // temp
            let table = "<table><tbody>"
            for (let i = 0; i < this.rows; i++) {
                table += "<tr>";
                for (let j = 0; j < this.cols; j++) {
                    table += "<td style='padding: 8px; line-height: 1.42857; vertical-align: top; border: 1px solid #999'>&nbsp;</td>"
                }
                table += "</tr>";
            }
            table += "</tbody></table>";

            this.$emit("exec", "insertHTML", table);
            //this.$parent.execCommand("insertHTML", table)
        }
    }
};

</script>