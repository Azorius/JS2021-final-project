<template>
  <div>
    <div id="nav">
      <NavigationBar :links="navLinks" />
    </div>
    <router-view />
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
