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
        { name: 'Login/Register', link: '/login' },
      ],
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand');
:root {
  --spacing-half: 10px;
  --spacing: 20px;
  --content-width: 62rem;
}
* {
  font-family: 'Quicksand', sans-serif;
  padding: 0px;
  margin: 0px;
}

body {
  background: #f0f0f0;
  overflow-y: scroll;
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
  max-width: var(--content-width);
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .page-content {
    width: 100%;
  }
}
</style>
