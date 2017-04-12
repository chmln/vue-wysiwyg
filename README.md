# vue-wysiwyg

![Vue WYSIWYG editor](https://cloud.githubusercontent.com/assets/11352152/23388265/2be2a302-fd2f-11e6-9c89-0e42bd491866.png)

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
Note on the image upload API endpoint:
- Image is uploaded by `multipart/form-data`
- Your endpoint must respond back with a string, the URL for the image - e.g. `http://myapp.com/images/12345.jpg`
