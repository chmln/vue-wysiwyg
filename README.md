## Usage

In your `main.js`:

```js
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {}); // config is optional. more below
```

In your components:
```html
<wysiwyg v-model="myHTML" />
```

## Config options

```js
{
  hideModules: ["bold"],
  image: {
    uploadURL: "/api/myEndpoint"
  }
}
```
Available Modules:
- bold
- headings
- hyperlink
- image
- italic
- list_ordered
- list_unordered
- removeFormat
- table

Note on the image upload API endpoint:
- Image is uploaded by `multipart/form-data`
- Your endpoint must respond back with a string, the URL for the image - e.g. `http://myapp.com/images/12345.jpg`
