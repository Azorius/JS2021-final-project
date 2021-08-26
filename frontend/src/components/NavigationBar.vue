<template>
  <header>
    <img src="@/assets/placeholder_icon.png" alt="" />
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
header {
  display: flex;
  flex-direction: row;
}
.navlink {
  text-decoration: none;
}

.navlink > div {
  width: 8rem;
  height: 3rem;
  text-align: center;
  text-decoration: none;

  border: 1px solid royalblue;
  box-sizing: border-box;
}

img {
  width: 3rem;
  height: 3rem;
  display: inline-block;
  margin-right: 1rem;
}
</style>
