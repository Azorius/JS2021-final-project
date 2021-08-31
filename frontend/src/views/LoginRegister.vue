<template>
  <div class="view">
    <label>email</label>
    <input type="text" v-model="email" />
    <label>name</label>
    <input type="text" v-model="name" />
    <label>password</label>
    <input type="text" v-model="password" />
    <button @click="login">Login</button>
    <button @click="register">Register</button>
    <button @click="autofill">Debug: autofill</button>
    <br />
    <div v-if="this.$store.state.currentUser">current user:</div>
    <p>{{ this.$store.state.currentUser }}</p>
    <br />
    <div v-if="debug">response</div>
    <p>{{ debug }}</p>
  </div>
</template>
<script>
export default {
  name: 'LoginRegister',
  data() {
    return {
      email: '',
      name: '',
      password: '',
      debug: '',
    }
  },
  methods: {
    register() {
      // todo: username >= 2 characters
      // todo: passowrd >= 6 characters
      // todo: validate email
      this.$store.dispatch('register', {
        data: {
          email: this.email,
          name: this.name,
          password: this.password,
        },
        callback: response => {
          this.debug = response
        },
      })
    },
    login() {
      this.$store.dispatch('login', {
        data: {
          email: this.email,
          password: this.password,
        },
        callback: response => {
          this.debug = response
        },
      })
    },
    autofill() {
      this.email = 'test@test.com'
      this.name = 'test'
      this.password = '123456'
    },
  },
}
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  width: 20rem;
  word-break: break-all;
}
</style>
