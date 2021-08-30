<template>
  <div>
    <div id="nav">
      <NavigationBar :links="navLinks" />
    </div>
    <router-view class="content" />
  </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: {
    NavigationBar,
  },
  data() {
    return {
      navLinks: [
        { name: 'Home', link: '/' },
        { name: 'Articles', link: '/posts' },
        { name: 'Add', link: '/posts/edit' },
      ],
    }
  },
}
</script>

<style>
.content {
  display: flex;
  justify-content: center;
}

.page-content {
  max-width: 60rem;
  border: 1px solid black;
}

@media (max-width: 768px) {
  .page-content {
    width: 100%;
  }
}
</style>
