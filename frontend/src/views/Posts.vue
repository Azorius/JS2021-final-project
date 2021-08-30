<template>
  <div class="article-list">
    <ArticlePreview
      class="article-card"
      v-for="(article, index) in articles"
      :key="`article-${index}`"
      :title="article.title"
      :text="article.text"
      img="http://localhost:3000/pictures/default-img.jpg"
    />
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'
import { mapGetters } from 'vuex'

export default {
  name: 'Posts',
  components: {
    ArticlePreview,
  },
  computed: {
    ...mapGetters(['articles']),
  },
}
</script>

<style scoped>
.article-card {
  height: 19rem;
  margin: var(--spacing-half);
}

.article-list {
  padding: var(--spacing-half);
}
</style>
