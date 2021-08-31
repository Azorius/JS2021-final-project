<template>
  <div class="view">
    <div
      class="article-image"
      :style="{
        backgroundImage: `url(http://localhost:3000/pictures/${article.imgName})`,
      }"
    >
      <h1>{{ article.title }}</h1>
    </div>
    <p>By: {{ article.owner.name }} Posted: {{ article.date }}</p>
    <br />
    <h4>{{ article.description }}</h4>
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
  created() {
    console.log('mounted')
    this.article = this.$store.getters.articles.find(
      article => article.id == this.$route.params.id
    )
    console.log(this.article)
  },
}
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: var(--spacing);
}

.article-image {
  width: 100%;
  height: 19rem;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  display: flex;
}

.article-image > h1 {
  align-self: flex-end;
  color: #fff;
  padding-bottom: var(--spacing);
  padding-left: var(--spacing);
}
</style>
