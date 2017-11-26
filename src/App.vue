<template lang="pug">
.wrapper
  div(v-for="article in articles")
    wysiwyg(v-model="article.content")
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      articles: [
        { content: "content1" },
        { content: "content2"}
      ]
    }
  }
}
</script>

<style>
* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
.wrapper {
  max-width: 800px;
  margin: 10em auto;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: -apple-system,
                BlinkMacSystemFont,
                "Segoe UI",
                Roboto,
                Oxygen-Sans,
                Ubuntu,
                Cantarell,
                "Helvetica Neue",
                sans-serif;
}
</style>
