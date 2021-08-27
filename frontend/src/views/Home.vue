<template>
  <div class="home">
    <ArticlePreviewSmall
      v-for="(article, index) in articles"
      :key="`article-${index}`"
      :title="article.title"
      img="https://petkeen.com/wp-content/uploads/2020/06/shutterstock_776419591-e1593876689446.jpg"
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
