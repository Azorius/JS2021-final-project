<template>
  <header>
    <div>
      <div class="navbar">
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
      </div>
    </div>
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
  justify-content: center;
}
header > div {
  width: var(--content-width);
  padding-left: var(--spacing);
  padding-right: var(--spacing);
  box-sizing: border-box;
}

.navbar {
  flex-direction: row;
  display: flex;
  background: #555555;
}

.navlink {
  text-decoration: none;
  display: flex;
}

.navlink > div {
  width: 8rem;
  height: 3rem;
  text-align: center;
  vertical-align: middle;
  padding-top: 12px;

  box-sizing: border-box;
  color: #ffffff;
  font-weight: bold;
}

.navlink:hover {
  background: #777777;
}

img {
  width: 3rem;
  height: 3rem;
  display: inline-block;
  margin-right: 1rem;
}
</style>
