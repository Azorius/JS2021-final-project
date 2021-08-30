<template>
  <div class="container">
    <div class="article-card" :style="{ backgroundImage: `url(${img})` }">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticlePreviewSmall',
  props: {
    title: String,
    img: String,
  },
}
</script>

<style scoped>
.article-card {
  width: 100%;
  height: 100%;
  color: #fff;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  /* debug */
  border: 1px solid fuchsia;
  box-sizing: border-box;
}

.article-card:hover {
  cursor: pointer;
  opacity: 0.6;
}

.container {
  width: 100%;
  height: 100%;
}

h3 {
  background: black;
}
</style>
