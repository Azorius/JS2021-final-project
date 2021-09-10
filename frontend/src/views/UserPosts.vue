<template>
  <div class="post-list">
    <h2 v-if="userPosts.length == 0" class="no-posts-label">
      You have no posts. Press + to add a post.
    </h2>
    <div
      class="post-card-wrapper"
      v-for="(post, index) in userPosts"
      :key="`post-${index}`"
    >
      <PostCard
        class="post-card"
        :title="post.title"
        :text="post.description"
        :img="`${imgEndpoint}/${post.imgName}`"
        :name="post.owner.name"
        :editMode="true"
        @delete="deleteArticle(post.id)"
        @edit="editArticle(post.id)"
        @click="openArticle(post.id)"
      />
    </div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import { mapGetters } from 'vuex'
// import Vue from 'vue'

export default {
  name: 'UserPosts',
  components: {
    PostCard,
  },
  computed: {
    ...mapGetters(['userPosts']),
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
        this.$store.dispatch('requestUserPosts')
      })
    },
  },
  mounted() {
    this.viewUser = true
    this.$store.dispatch('requestUserPosts')
  },
}
</script>

<style scoped>
.no-posts-label {
  padding-left: var(--spacing-half);
}
.post-card-wrapper {
  padding: var(--spacing-half);
}
.post-card {
  height: 19rem;
  width: 100%;
}

.post-list {
  padding: var(--spacing-half);
  width: 100%;
}
</style>
