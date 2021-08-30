<template>
  <header>
    <div>
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
  border: 1px solid blueviolet;
  display: flex;
  justify-content: center;
}
header > div {
  width: var(--content-width);
  flex-direction: row;
  display: flex;
  border: 1px solid fuchsia;
  padding-left: var(--spacing-half);
  padding-right: var(--spacing-half);
  box-sizing: border-box;
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
