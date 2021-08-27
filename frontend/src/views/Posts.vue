<template>
  <div>
    <ArticlePreview
      v-for="(article, index) in articles"
      :key="`article-${index}`"
      :title="article.title"
      :text="article.text"
      img="https://petkeen.com/wp-content/uploads/2020/06/shutterstock_776419591-e1593876689446.jpg"
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
