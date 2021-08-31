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
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        email: this.email,
        name: this.name,
        password: this.password,
        callback: response => {
          console.log(response)
        },
      })
    },
    login() {},
  },
}
</script>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
}
</style>
