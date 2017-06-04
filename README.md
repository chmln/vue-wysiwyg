## Usage

In your `main.js`:

```js
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {}); // config is optional. more below
```

Also make sure to load the stylesheet.
The exact syntax will depend on what preprocessor you use.

```css
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
```

In your components:
```html
<wysiwyg v-model="myHTML" />
```

## Config options

```js
{
  hideModules: { "bold": true },
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
