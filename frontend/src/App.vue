<template>
  <div class="content">
    <div id="nav">
      <NavigationBar
        :links="navLinks.filter(link => (link.login ? loginStatus : true))"
      />
    </div>
    <div class="page-wrapper">
      <router-view class="page-content" />
    </div>
  </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavigationBar,
  },
  data() {
    return {
      navLinks: [
        { name: 'Home', link: '/', login: false },
        { name: 'Articles', link: '/posts', login: false },
        { name: 'Add', link: '/posts/edit', login: true },
        { name: 'Login/Register', link: '/login', login: false },
        { name: 'My Posts', link: '/posts/user', login: true },
      ],
    }
  },
  computed: {
    ...mapGetters(['loginStatus']),
  },
  watch: {},
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
