<template>
  <div class="container">
    <div class="article-card" :style="{ backgroundImage: `url(${img})` }">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCardSmall',
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

  display: flex;
  align-items: flex-end;
  justify-content: center;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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
  color: #ffffff;
  margin-bottom: var(--spacing);
}
</style>
