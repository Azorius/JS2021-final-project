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
  flex: 1;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.article-text {
  flex: 1;
  color: #000;

  justify-content: center;
}

.container:hover {
  cursor: pointer;
  opacity: 0.6;
}

.container {
  width: 100%;
  height: 100%;

  display: flex;
  background: #f0f0f0;
}

@media (max-width: 480px) {
  .container {
    flex-direction: column;
  }

  .article-image {
    width: 100%;
    flex: 1;
  }

  .article-text {
    width: 100%;
    flex: 1.5;
  }
}
</style>
