<template>
  <div class="view">
    <div
      class="post-image"
      :style="{
        backgroundImage: `url(${imgEndpoint}/${post.imgName})`,
      }"
    >
      <h1>{{ post.title }}</h1>
    </div>
    <p>By: {{ post.owner.name }} Posted: {{ post.date }}</p>
    <br />
    <h4>{{ post.description }}</h4>
    <p>{{ post.text }}</p>
  </div>
</template>
<script>
export default {
  name: 'Post',
  data() {
    return {
      post: {},
    }
  },
  computed: {
    imgEndpoint() {
      return process.env.VUE_APP_IMG_ENDPOINT
    },
  },
  created() {
    this.post = this.$store.getters.posts.find(
      post => post.id == this.$route.params.id
    )
  },
}
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: var(--spacing);
}

.post-image {
  width: 100%;
  height: 19rem;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  display: flex;
}

.post-image > h1 {
  align-self: flex-end;
  color: #fff;
  padding-bottom: var(--spacing);
  padding-left: var(--spacing);
}
</style>
