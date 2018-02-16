<template>
  <div class="vue-wysiwyg module-dialog" :class="{'dialog-open': value}">
        <div class="module-dialog-container" :class="{'large': large, 'small': small}">
          <div class="dialog-header">
            <h4 class="dialog-title" v-text="title"></h4>
          </div>

          <div class="dialog-content">
              <component v-if="contentRenderable()" ref="contentEl" v-bind="componentOptions" :is="component" @exec="action" />

          </div>

          <div class="dialog-footer">
            <button type="button" v-for="(btn, index) in buttons" :key="index" @click="onButtonClick(btn)" :class="buttonClass(btn)" v-text="btn.text">

            </button>
          </div>
        </div>

      </div>


</template>

<script>
  import domUtils from "./dom-utils";
  export default {
    props : {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      componentOptions: {
        type: Object,
        default() {
          return {}
        }
      },
      component : {
        type: Object,
        default() {
          return {
            template: ''
          };
        }
      },
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      buttons: {
        type: Array,
        default() {
          return [
              {
                text: 'Close',
                action: 'close',
                style: 'close'
              },
              {
                text: 'Insert',
                action: 'insert',
                style: 'action'
              },
          ];
        }
      }
    },
    mounted() {
      document.addEventListener('click', (e) => {
        if (this.value && !this.$el.contains(e.target)) {
          this.cancel();
        }
      });

      document.addEventListener('keyup', (e) => {
        if (this.value && e.keyCode == 27) {
          this.cancel();
        }
      });
    },
    methods : {
      contentRenderable() {
        return (this.component.template || this.component.render);
      },
      buttonClass(btn) {
        return 'btn btn-' + btn.style;
      },
      action(...args) {
        console.log('Component executed');
        this.$emit('exec', ...args);
        this.$emit('close');
      },
      onButtonClick(btn) {
        if ('action' == btn.style) {
          if (this.$refs.contentEl.onAction && this.$refs.contentEl.onAction(btn) !== false) {
            // this.$emit('close');
          }
        }else {
          console.log('Button action');
          this.$emit(btn.action);
        }
      },
      onBackdropClicked(event) {
        if (event.currentTarget == this.$el) {
          return;
        }
        this.cancel();
      },
      close(value = null) {
        this.$emit('close', value);
      },
      cancel() {

        this.$emit('cancel');
      }
    }
  }
</script>

<style lang="stylus">
  $buttonBorderRadious = 4px;
  $offwhite = #f6f6f6
  .vue-wysiwyg {
    &.module-dialog {
      display: none;
      position: absolute;
      top:64px;
      left: 0;
      background: none;
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
      padding-top: 64px;

       z-index: 1000;

      &.dialog-open {
        display block;
      }

      .module-dialog-container {
        display: block;
        position: relative;
        width: 500px;
        margin: 0 auto;
        background: #FFFFFF;

        border: 1px solid #777;

        webkit-box-shadow: 0px 0px 7px 0px rgba(50, 50, 50, 0.75);
        -moz-box-shadow:    0px 0px 7px 0px rgba(50, 50, 50, 0.75);
        box-shadow:         0px 0px 7px 0px rgba(50, 50, 50, 0.75);

        .dialog-content {
          padding: 16px;
        }

        .dialog-header {
          padding: 16px;
          border-bottom: 1px groove #666;
        }

        .dialog-footer {
          text-align: right;
          padding: 16px;
          border-top: 1px groove #666;

          .btn {
            margin-left: 16px;
            color: #000 !important;
            font-size: 14px;
            box-shadow: 1px 1px 1px #BEE2F9;
            padding: 6px 15px;
            -moz-border-radius: $buttonBorderRadious;
            -webkit-border-radius: $buttonBorderRadious;
            border-radius: $buttonBorderRadious;
            border: 1px solid #EDEDED;
            background: #E0EBEE;
            background: linear-gradient(top,  #F0FFFE,  #EDE6EB);
            background: -ms-linear-gradient(top,  #F0FFFE,  #EDE6EB);
            background: -webkit-gradient(linear, left top, left bottom, from(#F0FFFE), to(#EDE6EB));
            background: -moz-linear-gradient(top,  #F0FFFE,  #EDE6EB);

            &:hover {
              color: #14396A !important;
              background: #468CCF;
              background: linear-gradient(top,  #F5F5F5,  #F0FFF3);
              background: -ms-linear-gradient(top,  #F5F5F5,  #F0FFF3);
              background: -webkit-gradient(linear, left top, left bottom, from(#F5F5F5), to(#F0FFF3));
              background: -moz-linear-gradient(top,  #F5F5F5,  #F0FFF3);
            }

            &.btn-action {
              font-family: georgia;
              font-size: 14px;
              box-shadow: 1px 1px 1px #BEE2F9;
              border: 1px solid #CBC7ED;
              background: #C1C8EE;
              background: linear-gradient(top,  #C4D8FF,  #D5D6ED);
              background: -ms-linear-gradient(top,  #C4D8FF,  #D5D6ED);
              background: -webkit-gradient(linear, left top, left bottom, from(#C4D8FF), to(#D5D6ED));
              background: -moz-linear-gradient(top,  #C4D8FF,  #D5D6ED);

              &:hover {
                color: #14396A !important;
                background: #468CCF;
                background: linear-gradient(top,  #ABB3F5,  #A3AFFF);
                background: -ms-linear-gradient(top,  #ABB3F5,  #A3AFFF);
                background: -webkit-gradient(linear, left top, left bottom, from(#ABB3F5), to(#A3AFFF));
                background: -moz-linear-gradient(top,  #ABB3F5,  #A3AFFF);
              }
            }
          }
        }
      }

    }
  }


  @media screen and (min-width: 1024) {
    .vue-wysiwyg {
      &.module-dialog {
        .module-dialog-container {
          width: 700px;
          &.large {
            width: 1000px;
          }

          &.small {
            width: 400px;
          }
        }
      }
    }
  }

</style>
