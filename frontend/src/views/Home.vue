<template>
  <div>
    <div class="page-content">
      <ArticlePreviewSmall
        class="article-card"
        v-for="(article, index) in latestArticles"
        :key="`article-${index}`"
        :title="article.title"
        img="http://localhost:3000/pictures/default-img.jpg"
      />
    </div>
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
  mounted() {
    this.$store.dispatch('requestArticles')
  },
}
</script>

<style scoped>
.page-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.article-card {
  width: 19rem;
  height: 19rem;
  margin: 5px;
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
