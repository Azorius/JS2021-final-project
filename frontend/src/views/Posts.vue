<template>
  <div class="post-list">
    <div
      class="post-card-wrapper"
      v-for="(post, index) in viewUser ? userPosts : posts"
      :key="`post-${index}`"
    >
      <PostCard
        class="post-card"
        :title="post.title"
        :text="post.description"
        :img="`${imgEndpoint}/${post.imgName}`"
        :name="post.owner.name"
        :editMode="viewUser"
        @delete="deletePost(post.id)"
        @edit="editPost(post.id)"
        @click="openPost(post.id)"
      />
    </div>

    <!-- will be observed by intersection observer -->
    <div id="suspect"></div>
  </div>
</template>

<script>
import PostCard from '@/components/PostCard'
import { mapGetters } from 'vuex'
// import Vue from 'vue'

var observer = null

export default {
  name: 'Posts',
  components: {
    PostCard,
  },
  data() {
    return {
      viewUser: false,
      blockRequest: true,
    }
  },
  computed: {
    ...mapGetters(['posts', 'userPosts']),
    imgEndpoint() {
      return process.env.VUE_APP_IMG_ENDPOINT
    },
  },
  methods: {
    openPost(id) {
      this.$router.push(`/posts/${id}`)
    },
    editPost(id) {
      this.$router.push(`/posts/edit/${id}`)
    },
    deletePost(id) {
      this.$store.dispatch('deletePost', id).then(() => {
        // could not figure out a good way to do this - Vue did not react to
        this.$store.dispatch('requestUserPosts')
      })
    },
  },
  mounted() {
    if (this.$route.name == 'UserPosts') {
      this.viewUser = true
      this.$store.dispatch('requestUserPosts')
    } else {
      observer = new IntersectionObserver(event => {
        // console.log(event)
        if (!this.blockRequest && event[0].intersectionRatio > 0) {
          this.blockRequest = true
          this.$store.dispatch('requestMorePosts').then(val => {
            if (!val) {
              observer.unobserve(document.querySelector('#suspect'))
            }
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
