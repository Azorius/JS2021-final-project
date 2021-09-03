<template>
  <div class="view">
    <h1>Error 404: Page Not Found</h1>
    <h2>
      The ducks you are looking for are in another page
    </h2>
    <button @click="this.$router.push('/')">Home</button>
  </div>
</template>
<style scoped>
.view {
  padding: var(--spacing);
  text-align: center;
}
button {
  width: 6rem;
}
</style>
