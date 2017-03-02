<template>
    <dropzone
        :id="_uid + 'vwdropzone'"
        :url="uploadURL"
        :useFontAwesome="true"
        @vdropzone-success="fileUploaded"
        @vdropzone-file-added="fileAdded"
        ref="dropzone"
        >
    </dropzone>
</template>

<script>
const Vue = require("vue");
import Dropzone from 'vue2-dropzone';
import bus from "../bus.js";

export default {
    name: "image",
    icon: "fa fa-image",

    components: {
        Dropzone
    },

    computed: {
        uploadURL () {
            return bus.options.image 
                ? bus.options.image.uploadURL
                : null;
        }
    },
    
    methods: {
        fileUploaded (file, r) {
            if (r)
                this.$emit("exec", "insertHTML", `<img src=${r}>`);
        },

        fileAdded(file){
            // if no upload url is defined, insert image with base64 src
            if (!file || !this.uploadURL)
                return;

            let reader = new FileReader();

            reader.addEventListener("load", () => {
               this.$emit("exec", "insertHTML", `<img src=${reader.result}>`);
            }, false);

            reader.readAsDataURL(file);
        }
    },

    beforeDestroy() {
        this.$refs.dropzone.dropzone.destroy();
    }
}
</script>

