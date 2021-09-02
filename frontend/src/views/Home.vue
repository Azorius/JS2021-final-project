<template>
  <div class="article-list">
    <ArticlePreviewSmall
      class="article-card"
      v-for="(article, index) in latestArticles"
      :key="`article-${index}`"
      :title="article.title"
      :img="`${imgEndpoint}/${article.imgName}`"
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
    imgEndpoint() {
      return process.env.VUE_APP_IMG_ENDPOINT
    },
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
  display: flex;
  flex-flow: wrap;
}

@media (max-width: 64rem) {
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
