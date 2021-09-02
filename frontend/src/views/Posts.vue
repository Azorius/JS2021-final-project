<template>
  <div class="article-list">
    <div
      class="article-card-wrapper"
      v-for="(article, index) in viewUser ? userArticles : articles"
      :key="`article-${index}`"
    >
      <ArticlePreview
        class="article-card"
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

    <!-- will be observed by intersection observer -->
    <div id="suspect"></div>
  </div>
</template>

<script>
import ArticlePreview from '@/components/ArticlePreview'
import { mapGetters } from 'vuex'
// import Vue from 'vue'

var observer = null

export default {
  name: 'Posts',
  components: {
    ArticlePreview,
  },
  data() {
    return {
      viewUser: false,
      blockRequest: true,
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
      observer = new IntersectionObserver(event => {
        // console.log(event)
        if (!this.blockRequest && event[0].intersectionRatio > 0) {
          this.blockRequest = true
          this.$store.dispatch('requestMoreArticles').then(val => {
            if (!val) {
              observer.unobserve(document.querySelector('#suspect'))
            }
            console.log(val)
            this.blockRequest = false
          })
        }
      })
      observer.observe(document.querySelector('#suspect'))
      this.blockRequest = false
    }
  },
}
</script>

<style scoped>
.article-card-wrapper {
  padding: var(--spacing-half);
}
.article-card {
  height: 19rem;
  width: 100%;
}

.article-list {
  padding: var(--spacing-half);
  width: 100%;
}
</style>
