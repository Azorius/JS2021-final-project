<template>
  <div class="view">
    <form class="view" v-on:submit.prevent="onSubmit">
      <InputField
        label="email"
        minlength="2"
        maxlength="255"
        @edit="inputEdited"
        :email="true"
      />
      <InputField
        v-if="this.$route.name == 'Register'"
        label="name"
        minlength="2"
        maxlength="30"
        @edit="inputEdited"
      />
      <InputField
        label="password"
        type="password"
        minlength="6"
        maxlength="255"
        @edit="inputEdited"
      />
      <button
        v-if="this.$route.name == 'Login'"
        :disabled="!(inputFields.email && inputFields.password)"
        @click="login"
      >
        Login
      </button>
      <button
        v-if="this.$route.name == 'Register'"
        :disabled="
          !(inputFields.email && inputFields.password && inputFields.name)
        "
        @click="register"
      >
        Register
      </button>
    </form>
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
      inputFields: {},
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          email: this.inputFields.email,
          name: this.inputFields.name,
          password: this.inputFields.password,
        })
        .then(() => {
          this.$router.push('/welcome')
        })
    },
    login() {
      this.$store
        .dispatch('login', {
          email: this.inputFields.email,
          password: this.inputFields.password,
        })
        .then(() => {
          this.$router.push('/posts/user')
        })
    },
    inputEdited(name, value) {
      this.inputFields[name] = value
      console.log(this.inputFields)
    },
  },
  mounted() {
    console.log(this.$route)
  },
}
</script>

<style scoped>
.view {
  display: flex;
  justify-content: center;
  padding-left: var(--spacing-half);
  padding-right: var(--spacing-half);
}
form {
  display: flex;
  flex-direction: column;
  width: 20rem;
}
</style>
