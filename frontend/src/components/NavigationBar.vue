<template>
  <header>
    <div class="navbar">
      <img src="@/assets/placeholder_icon.png" alt="" />
      <div class="text-links">
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
      <div class="img-links">
        <div
          v-for="(link, index) in links.filter(
            item => !item.submenu && item.img
          )"
          class="imglink"
          :key="`link-${index}`"
          @click="pressed(link)"
          @mouseover="link.isHover = true"
          @mouseleave="link.isHover = false"
          :style="{
            backgroundImage: `url(${
              link.isHover ? link.img.replace('.png', '_hover.png') : link.img
            })`,
          }"
        >
          <Dropdown
            v-if="link.menu"
            :options="links.filter(item => link.menu == item.submenu)"
            @optionClicked="dropdownOptionClicked"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Dropdown from '@/components/Dropdown'

export default {
  name: 'NavigationBar',
  components: {
    Dropdown,
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
    dropdownOptionClicked(option) {
      this.pressed(option)
    },
  },
}
</script>

<style scoped>
.text-links {
  display: flex;
  margin-right: auto;
}
.img-links {
  display: flex;
}
header {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing);
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
  border-bottom: 1px solid indigo;
  height: 58px;
}

.navlink {
  display: flex;
  width: 8rem;
  height: 3rem;
  text-align: center;
  justify-content: center;
  padding-top: 12px;
  box-sizing: border-box;
  color: indigo;
  font-weight: bold;
}

.imglink {
  width: 3rem;
  height: 3rem;
  background-size: cover;
}

.router-link {
  text-decoration: none;
}

.navlink:hover {
  background: rgb(96, 0, 165);
  color: white;
}

img {
  width: 3rem;
  height: 3rem;
  display: inline-block;
  margin-right: 1rem;
}
</style>
