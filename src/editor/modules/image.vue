<template>
    <Dropzone
        :options="dropzoneOptions"
        :id="_uid+'vwdropzone'"
        ref="dropzone"
        @vdropzone-success="fileUploaded"
        @vdropzone-file-added="fileAdded"
        >
    </Dropzone>
</template>

<script>
import Dropzone from 'vue2-dropzone';
import bus from 'src/editor/bus.js';
import 'vue2-dropzone/dist/vue2Dropzone.css'

const UPLOAD_ICON = '<svg fill="#666" width="26" height="24" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1344 864q0-14-9-23l-352-352q-9-9-23-9t-23 9l-351 351q-10 12-10 24 0 14 9 23t23 9h224v352q0 13 9.5 22.5t22.5 9.5h192q13 0 22.5-9.5t9.5-22.5v-352h224q13 0 22.5-9.5t9.5-22.5zm640 288q0 159-112.5 271.5t-271.5 112.5h-1088q-185 0-316.5-131.5t-131.5-316.5q0-130 70-240t188-165q-2-30-2-43 0-212 150-362t362-150q156 0 285.5 87t188.5 231q71-62 166-62 106 0 181 75t75 181q0 76-41 138 130 31 213.5 135.5t83.5 238.5z"/></svg>'

export default {
    title: "image",
    icon: '<svg width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"/></svg>',
    description: "Insert Image",

    props: ["options"],
    components: {
        Dropzone
    },

    computed: {
        uploadURL () {
            return this.options.image.uploadURL;
        },

        dropzoneOptions () {
          return {
            // custom dropzone options
            ...this.options.image.dropzoneOptions,

            // vue2-dropzone config
            id: `${this._uid}vwdropzone`,
            url: this.uploadURL,
            autoProcessQueue: this.uploadURL !== 'None',
            dictDefaultMessage: `<i class="fa">${UPLOAD_ICON}</i><br>Click here to upload...`,

          }
        }
    },

    methods: {
        fileUploaded (file, r) {
            if (r)
                this.$emit("exec", "insertHTML", `<img src=${r}>`);
        },

        fileAdded (file) {
            // if no upload url is defined, insert image with base64 src
            if (file && this.uploadURL !== "None")
                return;

            const reader = new FileReader();

            reader.addEventListener("load", () => {
               this.$emit("exec", "insertHTML", `<img src=${reader.result}>`);
            }, false);

            reader.readAsDataURL(file);
        }
    },
}
</script>

