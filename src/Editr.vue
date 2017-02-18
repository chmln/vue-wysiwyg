<template lang="pug">
.editr
    .editr--toolbar
        Btn(
            v-for="module in modules",
            :module="module",
            :key="module.name",
            @exec="exec(arguments[0], arguments[1])"
        )

    .editr--content(ref="content", contenteditable="true", tabindex="1", placeholder="Enter text...")

</template>

<script>
import Btn from "./Button.vue";

import bold from "./modules/bold.js";
import italic from "./modules/italic.js";
import separator from "./modules/separator.js";
import list_ordered from "./modules/list_ordered.js";
import list_unordered from "./modules/list_unordered.js";
import underline from "./modules/underline.js";
import table from "./modules/table.js";

export default {
    components: {
        Btn
    },

    data () {
        return {
            modules: [
                bold, italic, underline, separator,
                list_ordered, list_unordered, separator,
                 table
            ]
        }
    },

    methods: {
        exec: function(cmd, arg){
            this.$refs.content.focus();
            document.execCommand(cmd, false, arg||"");
        }
    }
}
</script>

<style lang="stylus">
@import "~font-awesome/css/font-awesome.css";
$offwhite = #f3f3f3

.editr--toolbar
    background #f6f6f6
    position relative
    display flex
    height 32px

    a
        display inline-block
        width 32px
        height 32px
        color #333
        cursor pointer
        text-align center
        line-height 32px

        &:hover
            background alpha(black, 0.1)

        &.vw-btn-separator
            width 1px
            margin 0 10px
            &:hover
                background initial
                cursor default

            i
                border-left 1px solid alpha(black, 0.1)
                height 100%
                position absolute
                width 1px

    .dashboard
        width 100%
        position absolute
        top 32px
        left 0
        text-align left
        padding 0.5rem 1rem
        background alpha(white, 0.95)
        border 1px solid $offwhite



.editr--content
    min-height 150px
    padding 0.5em
    border 1px solid $offwhite

    &[contenteditable=true]:empty:before
        content: attr(placeholder);
        color alpha(black, 0.3)
        display: block; /* For Firefox */


    &:focus
        outline 0

    ol
        li
            list-style-position: inside;

</style>
