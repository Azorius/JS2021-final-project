<template>
  <div class="content">
    <div id="nav">
      <NavigationBar
        :links="navLinks.filter(link => (link.login ? loginStatus : true))"
        @actionPressed="actionPressed"
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
        { login: false, name: 'Home', link: '/' },
        { login: false, name: 'Articles', link: '/posts' },
        { login: true, name: 'Add', link: '/posts/edit' },
        { login: false, name: 'Login/Register', link: '/login' },
        { login: true, name: 'My Posts', link: '/posts/user' },
        { login: true, name: 'Logout', action: 'logout' },
      ],
    }
  },
  computed: {
    ...mapGetters(['loginStatus']),
  },
  methods: {
    actionPressed(action) {
      console.log('pressed')
      if (action == 'logout') {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/')
        })
      }
    },
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

button {
  background: indigo;
  color: white;
  height: 2rem;
  margin-top: calc(var(--spacing) * 2);
  border: none;
}
button:hover {
  background: rgb(96, 0, 165);
}

button:disabled {
  background: rgb(153, 143, 160);
}
</style>
