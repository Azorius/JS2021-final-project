<template>
  <div class="view">
    <div
      class="article-image"
      :style="{
        backgroundImage: `url(http://localhost:3000/pictures/${article.imgName})`,
      }"
    >
      <h2>{{ article.title }}</h2>
    </div>
    <p>{{ article.description }}</p>
    <p>{{ article.text }}</p>
  </div>
</template>
<script>
export default {
  name: 'SinglePost',
  data() {
    return {
      article: {},
    }
  },
  mounted() {
    this.article = this.$store.getters.articles.find(
      article => article.id == this.$route.params.id
    )
  },
}
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.article-image {
  width: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
