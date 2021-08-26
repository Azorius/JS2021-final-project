<template>
  <div class="container">
    <div
      class="article-image"
      :style="{ backgroundImage: `url(${img})` }"
    ></div>
    <div class="article-text">
      <h3>{{ title }}</h3>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlePreviewSmall',
  props: {
    title: String,
    text: String,
    img: String,
  },
}
</script>

<style scoped>
.article-image {
  width: 50%;
  height: 18rem;
  color: #fff;

  display: inline-block;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.article-text {
  width: 50%;
  color: #000;

  display: inline-block;
  justify-content: center;
  /* debug */
  border: 1px solid darkorange;
  box-sizing: border-box;
}

.container:hover {
  cursor: pointer;
  opacity: 0.6;
}

.container {
  width: 100%;
  height: 18rem;
  margin: 5px;

  display: flex;

  /* debug */
  border: 1px solid fuchsia;
  box-sizing: border-box;
}
</style>
