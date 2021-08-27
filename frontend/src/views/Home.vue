<template>
  <div class="home">
    <ArticlePreviewSmall
      v-for="(article, index) in latestArticles"
      :key="`article-${index}`"
      :title="article.title"
      :img="article.img"
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
}
</script>
