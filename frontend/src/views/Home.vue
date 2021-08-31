<template>
  <div class="article-list">
    <ArticlePreviewSmall
      class="article-card"
      v-for="(article, index) in latestArticles"
      :key="`article-${index}`"
      :title="article.title"
      img="http://localhost:3000/pictures/default-img.jpg"
      @click="openArticle(article.id)"
    />
  </div>
</template>

<script>
import ArticlePreviewSmall from '@/components/ArticlePreviewSmall'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    ArticlePreviewSmall,
  },
  computed: {
    ...mapGetters(['latestArticles']),
  },
  methods: {
    openArticle(id) {
      this.$router.push(`/posts/${id}`)
    },
  },
  mounted() {
    this.$store.dispatch('requestArticles')
  },
}
</script>

<style scoped>
.article-card {
  width: 19rem;
  height: 19rem;
  margin: var(--spacing-half);
}

.article-list {
  padding: var(--spacing-half);
}

@media (max-width: 768px) {
  .article-card {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .article-card {
    display: inline-block;

    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }
}
</style>
