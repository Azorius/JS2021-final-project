<template>
  <div class="view">
    <InputField
      label="email"
      :value="email"
      minlength="2"
      maxlength="255"
      @valid="setValidationState"
      :email="true"
    />
    <InputField
      v-if="this.$route.name == 'Register'"
      label="name"
      :value="name"
      minlength="2"
      maxlength="30"
      @valid="setValidationState"
    />
    <InputField
      label="password"
      :value="password"
      type="password"
      minlength="6"
      maxlength="255"
      @valid="setValidationState"
    />
    <button
      v-if="this.$route.name == 'Login'"
      :disabled="!(validFields.email && validFields.password)"
      @click="login"
    >
      Login
    </button>
    <button
      v-if="this.$route.name == 'Register'"
      :disabled="
        !(validFields.email && validFields.password && validFields.name)
      "
      @click="register"
    >
      Register
    </button>
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
      validFields: {},
    }
  },
  methods: {
    register() {
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
      this.validFields = {
        password: true,
        email: true,
      }
    },
    setValidationState(name, value) {
      this.validFields[name] = value
      console.log(this.validFields)
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
  flex-direction: column;
  width: 20rem;
  word-break: break-all;
}
</style>
