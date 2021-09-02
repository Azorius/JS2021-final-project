<template>
  <div class="content-wrapper">
    <div class="content">
      <NavigationBar
        :links="
          navLinks.filter(link => (loginStatus ? link.login : link.logout))
        "
        @actionPressed="actionPressed"
      />
      <ViewHeader :text="$route.meta.header" />
      <router-view />
    </div>
  </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'
import ViewHeader from '@/components/ViewHeader'
import { mapGetters } from 'vuex'

export default {
  components: {
    NavigationBar,
    ViewHeader,
  },
  data() {
    return {
      navLinks: [
        {
          logout: true,
          login: true,
          name: 'Home',
          link: '/',
        },
        {
          logout: true,
          login: true,
          name: 'Articles',
          link: '/posts',
        },
        {
          login: true,
          name: 'Add',
          link: '/posts/edit',
          img: '/icon_add.png',
        },
        {
          logout: true,
          name: 'Login',
          link: '/login',
          submenu: 'user',
        },
        {
          logout: true,
          name: 'Register',
          link: '/register',
          submenu: 'user',
        },
        {
          login: true,
          name: 'My Posts',
          link: '/posts/user',
          submenu: 'user',
        },
        {
          login: true,
          name: 'Logout',
          action: 'logout',
          submenu: 'user',
        },
        {
          login: true,
          logout: true,
          menu: 'user',
          img: '/icon_user.png',
        },
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
  created() {
    if (this.$route.name != 'Home') {
      this.$router.push('/')
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand');
:root {
  --spacing-half: 10px;
  --spacing: 20px;
  --content-width: 62.2rem;

  --color-primary: indigo;
  --color-primary-hover: rgb(96, 0, 165);
  --color-primary-disabled: rgb(153, 143, 160);
}
* {
  font-family: 'Quicksand', sans-serif;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}

body {
  background: #f0f0f0;
  overflow-y: scroll;
}

.content-wrapper {
  display: flex;
  justify-content: center;
  widows: 100%;
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: var(--content-width);
  width: 100%;
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
