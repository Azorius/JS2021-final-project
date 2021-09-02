<template>
  <header>
    <div class="navbar">
      <img src="@/assets/placeholder_icon.png" alt="" />
      <div
        v-for="(link, index) in links.filter(
          item => !item.submenu && !item.img
        )"
        class="navlink"
        :key="`link-${index}`"
        @click="pressed(link)"
      >
        {{ link.name }}
      </div>
    </div>
  </header>
</template>

<script>
// import Dropdown from '@/components/Dropdown'

export default {
  name: 'NavigationBar',
  components: {
    // Dropdown,
  },
  props: {
    links: Array,
  },
  methods: {
    pressed(link) {
      if (link.action) {
        this.$emit('actionPressed', link.action)
      }
      if (link.link) {
        this.$router.push(link.link)
      }
    },
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
  background: indigo;
}

.navlink {
  display: flex;
  width: 8rem;
  height: 3rem;
  text-align: center;
  vertical-align: middle;
  padding-top: 12px;
  box-sizing: border-box;
  color: #ffffff;
  font-weight: bold;
}

.router-link {
  text-decoration: none;
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
