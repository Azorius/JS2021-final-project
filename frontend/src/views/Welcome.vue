<template>
  <div class="view">
    <h1>Welcome to Duck Posts blog!</h1>
    <h2>
      You have successfully created your account, log in and share your Duck
      Posts today!
    </h2>
    <button @click="this.$router.push('/login')">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style scoped>
.view {
  padding: var(--spacing);
  text-align: center;
}
button {
  width: 6rem;
}
</style>
