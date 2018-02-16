<template lang="pug">
.editr
    .editr--toolbar
        template(v-for="(module,i) in modules")
          component(
            :is="module",
            class="item",
            :class="'vw-btn-'+module.title",
            v-if="module.inline",
            @exec="exec",
            tabindex="-1",
            :ref="'btn-'+module.title",
            :title="module.description || ''"
          )
          Btn(
              v-else
              :module="module",
              :options="mergedOptions",
             
              @open="showDialog",
              @exec="exec",
              tabindex="-1",
              @close="closeDialog",
              :ref="'btn-'+module.title",
              :title="module.description || ''"
          )

    .editr--content(
        ref="content",
        contenteditable="true",
        tabindex="1",
        :placeholder="placeholder")
    EditorDialog(
        v-bind="dialog",
        @close="closeDialog",
        @exec="exec",
        @cancel="closeDialog"
    )

</template>

<script>
import bus from 'src/bus.js';
import debounce from "debounce";
import Btn from "./Button.vue";

import bold from "./modules/bold.js";
import italic from "./modules/italic.js";
import underline from "./modules/underline.js";
import format from './modules/format.vue';
import headings from "./modules/headings.vue";
import hyperlink from "./modules/hyperlink.vue";
import list_ordered from "./modules/list_ordered.js";
import list_unordered from "./modules/list_unordered.js";

import image from "./modules/image.vue";
import table from "./modules/table.vue";

import removeFormat from "./modules/removeFormat.js";

import separator from "./modules/separator.js";

import moduleDialog from './Dialog.vue';

const modules = [
    bold, italic, underline, separator,
    format, hyperlink,
    list_ordered, list_unordered, separator,
    image, table, separator,
    removeFormat
];

const DEFAULT_DIALOG_VALUE = {
  value: false,
  title: '',
  component: {
    template: ''
  },
  buttons: [
    {
      text: 'Close',
      style: 'close',
      action: 'close'
    }
  ]
};

export default {
    model: {
        prop: "html",
        event: "html"
    },

    props: {
        html: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "Enter text..."
        },
        options: {type: Object, default() {
          return {};
        }}
    },


    components: { Btn, EditorDialog: moduleDialog  },

    data () {
        return {
            selection: "",
            dialog: Object.assign({}, DEFAULT_DIALOG_VALUE),
            suspendSelectionSave: false
        };
    },

    computed: {
        mergedOptions () {
          return { ...bus.options, ...this.options}
        },

        modules: function() {
            let derivedModules = [];
            if (this.mergedOptions.hideModules) {
                derivedModules = modules.filter(m => !this.mergedOptions.hideModules[m.title]);
            }else {
                derivedModules = [...modules];
            }
            if (this.mergedOptions.customModules) {
                derivedModules = derivedModules.concat(this.mergedOptions.customModules);
            }
            return derivedModules;
        },

        btnsWithDashboards: function () {
            if (this.modules)
                return this.modules.filter(m => m.render);
            return [];
        },

        innerHTML: {
            get () {
                return this.$refs.content.innerHTML;
            },

            set (html) {
                if (this.$refs.content.innerHTML !== html) {
                    this.$refs.content.innerHTML = html;
                }
            }
        }
    },

    methods: {
        showDialog(args) {
          if (this.dialog.value) {
            return;
          }
          // this.saveSelection();
          this.dialog = {value: true, ...args};
        },
        closeDialog() {
          this.dialog = Object.assign({}, DEFAULT_DIALOG_VALUE);
        },
        performDialogAction(args) {
          this.closeDialog();
          this.exec(args.action, args.options, args.select);
        },
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

        exec (cmd, arg, sel){
            console.log('Executing exec with %s: %s', cmd, arg);
            // if (this.selection) {
            //   this.restoreSelection(this.selection);
            // }
            sel !== false && this.selection && this.restoreSelection(this.selection);
            document.execCommand(cmd, false, arg||"");

            this.selection = null;

            this.$nextTick(this.emit);
        },

        onDocumentClick (e) {

            // for (let i = 0; i < this.btnsWithDashboards.length; i++) {
            //     const btn = this.$refs[`btn-${this.btnsWithDashboards[i].title}`][0];
            //     if (btn && btn.showDashboard && !btn.$el.contains(e.target))
            //         btn.closeDashboard();
            // }
        },

        emit () {
          this.$emit("html", this.$refs.content.innerHTML);
          this.$emit("change", this.$refs.content.innerHTML);
        },

        onInput: debounce(function() {
          // this.grabCurrentSelection();
          this.emit();

        }, 300),

        onFocus () {
          document.execCommand("defaultParagraphSeparator", false, this.mergedOptions.paragraphSeparator);
          // this.grabCurrentSelection();
        },

        grabCurrentSelection(e) {
          this.selection = this.saveSelection();
        },

        onContentBlur () {
          // if (this.suspendSelectionSave) {
          //   return;
          // }
          // save focus to restore it later
          console.log('Saving selection');
          this.selection = this.saveSelection();
          console.dir(this.selection);
        },

        syncHTML () {
            if (this.html !== this.$refs.content.innerHTML)
                this.innerHTML = this.html;
        }
    },

    mounted () {
        // this.contentEventHandlers = {
        //   'blur': (e) => {
        //     this.grabCurrentSelection();
        //   },
        //   'paste': (e) => {
        //     this.grabCurrentSelection();
        //   },
        //   'cut': (e) => {
        //     this.grabCurrentSelection();
        //   },
        //   'keyup': (e) => {
        //     this.grabCurrentSelection();
        //   }
        // };
        this.unwatch = this.$watch("html", this.syncHTML, { immediate: true});

        // document.addEventListener("click", this.onDocumentClick);

        this.$refs.content.addEventListener("focus", this.onFocus);

        this.$refs.content.addEventListener("input", this.onInput);

        // this.onContentBlur = this.onContentBlur.bind(this);

        this.$refs.content.addEventListener("focus", this.onContentBlur, {capture : true, immediate: true});
        this.$refs.content.addEventListener("keyup", this.onContentBlur, {capture : true, immediate: true});

        // const events = Object.keys(this.contentEventHandlers);

        // events.forEach((name) => {
        //   this.$refs.content.addEventListener(name, this.contentEventHandlers[name], { capture: true });
        // });

    },

    created() {
      this.onInput = this.onInput.bind(this);
      this.onFocus = this.onFocus.bind(this);


    },

    beforeDestroy () {
      this.unwatch();
      // document.removeEventListener("click", this.onDocumentClick);

      this.$refs.content.removeEventListener("input", this.onInput);

      this.$refs.content.removeEventListener("focus", this.onFocus);

      this.$refs.content.removeEventListener("focus", this.onContentBlur);
      this.$refs.content.removeEventListener("keyup", this.onContentBlur);


      // // const events = Object.keys(this.contentEventHandlers);

      //  this.$refs.content.removeEventListener('blur', this.onContentBlur);

      // events.forEach((name) => {
      //   this.$refs.content.removeEventListener(name, this.contentEventHandlers[name]);
      // });
    }
}
</script>

<style lang="stylus">
$offwhite = #f6f6f6
$buttonWidth = 8vw
$buttonHeight = 32px
$svgSize = 16px

.editr
    border 1px solid darken($offwhite, 7.5%)
    width 100%

.editr--toolbar
    background $offwhite
    border-bottom 1px solid darken($offwhite, 7.5%)
    position relative
    display flex
    height $buttonHeight

    a, .item
        display inline-block
        
        height $buttonHeight
        color #333
        fill #333
        cursor pointer
       
        line-height 1

        &:hover
            background alpha(black, 0.1)

        &:active
            background alpha(black, 0.2)

        svg
            width $svgSize
            height $svgSize
            margin (($buttonHeight - $svgSize)/2) auto

            path
                fill inherit

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

    a {
      width $buttonWidth
      max-width 32px
      text-align center
    }
    
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
    padding 0.75rem 0.5rem
    line-height 1.33
    font-family inherit
    color inherit

    &[contenteditable=true]:empty:before
        content: attr(placeholder);
        color alpha(black, 0.3)
        display: block; /* For Firefox */

    img
        max-width 100%

    table
        width 100%

        th
            text-align left

    &:focus
        outline 0

    ul, ol
        li
            list-style-position: inside;

</style>
