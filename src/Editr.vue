<template lang="pug">
.editr
    .editr--toolbar
        Btn(
            v-for="module in modules",
            :module="module",
            :key="module.name",
            @exec="exec(arguments[0], arguments[1])",
            :ref="'btn-'+module.name",
            :title="module.title || ''"
        )

    .editr--content(ref="content", contenteditable="true", tabindex="1", placeholder="Enter text...")

</template>

<script>
import bus from "./bus.js";
import debounce from "debounce";
import Btn from "./Button.vue";

import bold from "./modules/bold.js";
import italic from "./modules/italic.js";
import underline from "./modules/underline.js";

import headings from "./modules/headings.js";
import hyperlink from "./modules/hyperlink.js";
import list_ordered from "./modules/list_ordered.js";
import list_unordered from "./modules/list_unordered.js";

import image from "./modules/image.js";
import table from "./modules/table.js";

import removeFormat from "./modules/removeFormat.js";

import separator from "./modules/separator.js";

const modules = [
    bold, italic, underline, separator,
    headings, hyperlink,
    list_ordered, list_unordered, separator,
    image, table, separator,
    removeFormat
];

export default {
    model: {
        prop: "html",
        event: "html"
    },

    props: {
        html: {
            type: String,
            default: ""
        }
    },


    components: { Btn  },

    data () {
        return {
            selection: ""
        }
    },

    computed: {
        modules: function() {
            if (bus.options.hideModules)
                return modules.filter(m => !bus.options.hideModules[m.name]);
            return modules;
        },

        btnsWithDashboards: function () {
            if (this.modules)
                return this.modules.filter(m => m.$mount);
            return [];
        },

        innerHTML: {
            get () {
                return this.$refs.content.innerHTML;
            },

            set (html) {
                if (this.innerHTML !== html) {
                    this.$refs.content.innerHTML = html;
                }
            }
        }
    },

    methods: {
        saveSelection() {
            if (window.getSelection) {
                this.selection = window.getSelection();
                if (this.selection.getRangeAt && this.selection.rangeCount) {
                    return this.selection.getRangeAt(0);
                }
            } else if (document.selection && document.selection.createRange) {
                return document.selection.createRange();
            }
            return null;
        },

        restoreSelection(range) {
            if (range) {
                if (window.getSelection) {
                    this.selection = window.getSelection();
                    this.selection.removeAllRanges();
                    this.selection.addRange(range);
                }
                else if (document.selection && range.select)
                    range.select();
            }
        },

        exec: function(cmd, arg){
            this.$refs.content.focus();
            document.execCommand(cmd, false, arg||"");


            this.$nextTick(() => {
                this.$emit("html", this.$refs.content.innerHTML);
            });
        },

        onDocumentClick (e) {
            for (let i = 0; i < this.btnsWithDashboards.length; i++) {
                const btn = this.$refs[`btn-${this.btnsWithDashboards[i].name}`][0];
                if (btn && btn.showDashboard && !btn.$el.contains(e.target))
                    btn.closeDashboard();
            }
        },

        onInput: debounce(function (e){
            this.$emit("html", this.$refs.content.innerHTML);
        }, 300),

        syncHTML () {
            console.log("syncing", this.html, this.$refs.content.innerHTML)
            if (this.html !== this.$refs.content.innerHTML)
                this.innerHTML = this.html;
            
            if (this.unWatch)
                this.unWatch();
        }
    },

    mounted () {
        this.unWatch = this.$watch("html", this.syncHTML, { immediate: true});

        this.$refs.content.addEventListener("input", this.onInput);
        document.addEventListener("click", this.onDocumentClick);
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

        &:active
            background alpha(black, 0.2)

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
    line-height 1.33
    font-family inherit

    &[contenteditable=true]:empty:before
        content: attr(placeholder);
        color alpha(black, 0.3)
        display: block; /* For Firefox */


    &:focus
        outline 0

    ul, ol
        li
            list-style-position: inside;

</style>
