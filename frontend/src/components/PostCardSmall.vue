<template>
  <div class="container">
    <div class="post-card" :style="{ backgroundImage: `url(${img})` }">
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
.post-card {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.post-card:hover {
  cursor: pointer;
  opacity: 0.9;
  transform: scale(1.01);
}

.container {
  width: 100%;
  height: 100%;

  transition: 0.12s;
}

h3 {
  color: #ffffff;
  margin-bottom: var(--spacing);
}
</style>
