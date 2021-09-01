<template>
  <div class="article-list">
    <ArticlePreview
      class="article-card"
      v-for="(article, index) in viewUser ? userArticles : articles"
      :key="`article-${index}`"
      :title="article.title"
      :text="article.description"
      :img="`${imgEndpoint}/${article.imgName}`"
      :name="article.owner.name"
      :editMode="viewUser"
      @delete="deleteArticle(article.id)"
      @edit="editArticle(article.id)"
      @click="openArticle(article.id)"
    />
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'
import { mapGetters } from 'vuex'
// import Vue from 'vue'

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
    editArticle(id) {
      this.$router.push(`/posts/edit/${id}`)
    },
    deleteArticle(id) {
      this.$store.dispatch('deletePost', id).then(() => {
        // could not figure out a good way to do this - Vue did not react to
        this.$store.dispatch('requestUserArticles')
      })
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
  width: 100%;
}
</style>
