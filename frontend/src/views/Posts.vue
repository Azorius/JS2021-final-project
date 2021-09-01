<template>
  <div class="article-list">
    <ArticlePreview
      class="article-card"
      v-for="(article, index) in viewUser ? userArticles : articles"
      :key="`article-${index}`"
      :title="article.title"
      :text="article.text"
      :img="`${imgEndpoint}/${article.imgName}`"
      :name="article.owner.name"
      @click="openArticle(article.id)"
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
  data() {
    return {
      viewUser: false,
    }
  },
  computed: {
    ...mapGetters(['articles', 'userArticles']),
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
    if (this.$route.name == 'UserPosts') {
      this.viewUser = true
      this.$store.dispatch('requestUserArticles')
    } else {
      this.$store.dispatch('requestArticles')
    }
  },
}
</script>

<style scoped>
.article-card {
  height: 19rem;
  margin: var(--spacing-half);
}

.article-list {
  padding: var(--spacing-half);
}
</style>
