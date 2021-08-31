<template>
  <header>
    <div>
      <div class="navbar">
        <img src="@/assets/placeholder_icon.png" alt="" />
        <div
          v-for="(link, index) in links"
          :key="`link-${index}`"
          class="navlink"
        >
          <router-link class="router-link" v-if="link.link" :to="link.link">
            <div>
              {{ link.name }}
            </div>
          </router-link>

          <div v-else @click="actionPressed(link.action)">
            {{ link.name }}
          </div>
        </div>
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
  methods: {
    actionPressed(action) {
      this.$emit('actionPressed', action)
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
  background: #555555;
}

.navlink {
  display: flex;
}

.navlink div {
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
