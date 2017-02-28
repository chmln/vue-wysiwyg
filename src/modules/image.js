const Vue = require("vue");
import Dropzone from 'vue2-dropzone';
import bus from "../bus.js";

export default new Vue({
    components: {
        Dropzone
    },
    template: `
        <dropzone
            id="vwdropzone"
            :url="uploadURL"
            :useFontAwesome="true"
            @vdropzone-success="fileUploaded"
            @vdropzone-file-added="fileAdded"
            >
        </dropzone>
    `,


    data(){
        return {
            name: "image",
            icon: "fa fa-image",
            uploadURL:  "/"
        }
    },
    methods: {
        fileUploaded (file, r) {
            if (r)
                this.$emit("exec", "insertHTML", `<img src=${r}>`);
        },

        fileAdded(file){
            // if no upload url is defined, insert image with base64 src
            if (!file || this.uploadURL !== "/")
                return;

            let reader = new FileReader();

            reader.addEventListener("load", () => {
               this.$emit("exec", "insertHTML", `<img src=${reader.result}>`);
            }, false);

            reader.readAsDataURL(file);
        }
    },

    created () {
        bus.$on("newOptions", newOptions => {
            if (newOptions && newOptions.image)
                this.$set(this.$data, "uploadURL", newOptions.image.uploadURL || "/");
        });
    }
});

