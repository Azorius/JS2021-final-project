<template>
  <div class="content">
    <div id="nav">
      <NavigationBar :links="navLinks" />
    </div>
    <div class="page-wrapper">
      <router-view class="page-content" />
    </div>
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
  flex-direction: column;
}

.page-wrapper {
  border: 1px solid blueviolet;
  display: flex;
  justify-content: center;
}

.page-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 60rem;
  border: 1px solid black;
}

@media (max-width: 768px) {
  .page-content {
    width: 100%;
  }
}
</style>
