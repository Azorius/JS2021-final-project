<template>
  <div>
    <ArticlePreview
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
