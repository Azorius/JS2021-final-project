<template>
  <div class="post-list">
    <PostCardSmall
      class="post-card"
      v-for="(post, index) in latestPosts"
      :key="`post-${index}`"
      :title="post.title"
      :img="`${imgEndpoint}/${post.imgName}`"
      @click="openArticle(post.id)"
    />
  </div>
</template>

<script>
import PostCardSmall from '@/components/PostCardSmall'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    PostCardSmall,
  },
  computed: {
    ...mapGetters(['latestPosts']),
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
    this.$store.dispatch('requestMorePosts')
  },
}
</script>

<style scoped>
.post-card {
  width: 19rem;
  height: 19rem;
  margin: var(--spacing-half);
}

.post-list {
  padding: var(--spacing-half);
  display: flex;
  flex-flow: wrap;
}

@media (max-width: 64rem) {
  .post-card {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .post-card {
    display: inline-block;

    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
  }
}
</style>
