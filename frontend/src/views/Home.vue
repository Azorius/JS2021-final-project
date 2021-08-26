<template>
  <div class="home">
    <ArticlePreviewSmall
      v-for="(article, index) in articles"
      :key="`article-${index}`"
      :title="article.title"
    />
  </div>
</template>

<script>
import ArticlePreviewSmall from '@/components/ArticlePreviewSmall'

export default {
  name: 'Home',
  components: {
    ArticlePreviewSmall,
  },
  data() {
    return {
      articles: [
        { title: 'Title 1' },
        { title: 'Title 2' },
        { title: 'Title 3' },
      ],
    }
  },
}
</script>
