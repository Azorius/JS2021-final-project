<template>
  <div class="view">
    <InputField label="email" :value="email" minlength="2" maxlength="255" />
    <InputField label="name" :value="name" minlength="2" maxlength="30" />
    <InputField
      label="password"
      :value="password"
      type="password"
      minlength="6"
      maxlength="255"
    />
    <button @click="login">Login</button>
    <button @click="register">Register</button>
    <button @click="autofill">Debug: autofill</button>
  </div>
</template>
<script>
import InputField from '@/components/InputField'

export default {
  name: 'LoginRegister',
  components: {
    InputField,
  },
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
      this.$store
        .dispatch('register', {
          email: this.email,
          name: this.name,
          password: this.password,
        })
        .then(response => {
          this.debug = response
        })
    },
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
        })
        .then(data => {
          console.log('i am here')
          console.log(data)
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
