<template>
  <header>
    <img src="@/assets/placeholder_icon.png" alt="" />
    <router-link
      v-for="(link, index) in links"
      :key="`link-${index}`"
      class="navlink"
      :to="link.link"
    >
      <div>
        {{ link.name }}
      </div>
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    links: Array,
  },
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  border: 1px solid blueviolet;
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
