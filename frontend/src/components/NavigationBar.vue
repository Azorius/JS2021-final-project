<template>
  <header>
    <router-link class="navlink" to="/">
      <div>
        Home
      </div>
    </router-link>
    <router-link class="navlink" to="/posts">
      <div>
        Posts
      </div>
    </router-link>
  </header>
</template>

<style scoped>
.navlink > div {
  padding: 10px;
  display: inline-block;
  width: 4rem;
  text-align: center;

  border: 1px solid royalblue;
}
</style>
