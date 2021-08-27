<template>
  <div class="home">
    <ArticlePreviewSmall
      v-for="(latestArticles, index) in articles"
      :key="`article-${index}`"
      :title="article.title"
      img="https://petkeen.com/wp-content/uploads/2020/06/shutterstock_776419591-e1593876689446.jpg"
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
