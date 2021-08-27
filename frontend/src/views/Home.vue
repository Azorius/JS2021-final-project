<template>
  <div class="home">
    <ArticlePreviewSmall
      v-for="(article, index) in latestArticles"
      :key="`article-${index}`"
      :title="article.title"
      img="http://localhost:3000/pictures/default-img.jpg"
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
  mounted() {
    this.$store.dispatch('requestArticles')
  },
}
</script>
