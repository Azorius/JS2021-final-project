<template>
  <div class="view">
    <label>email</label>
    <input type="text" v-model="email" />
    <label>username</label>
    <input type="text" v-model="username" />
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
      username: '',
      password: '',
    }
  },
  methods: {
    register() {},
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
