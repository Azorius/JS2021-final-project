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
@import url('https://fonts.googleapis.com/css2?family=Quicksand');

* {
  font-family: 'Quicksand', sans-serif;
  padding: 0px;
  margin: 0px;
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.page-wrapper {
  display: flex;
  justify-content: center;
}

.page-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 60rem;
}

@media (max-width: 768px) {
  .page-content {
    width: 100%;
  }
}
</style>
