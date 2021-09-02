<template>
  <div
    class="trigger"
    @mouseover="mouseoverTrigger = true"
    @mouseleave="mouseoverTrigger = false"
  >
    <div
      class="dropdwon"
      @mouseover="mouseoverMenu = true"
      @mouseleave="mouseoverMenu = false"
      v-if="mouseoverTrigger || mouseoverMenu"
    >
      <div
        v-for="option in options"
        :key="`option-${option.name}`"
        @click="optionClicked(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    options: Array,
  },
  data() {
    return {
      mouseoverTrigger: false,
      mouseoverMenu: false,
    }
  },
  methods: {
    optionClicked(option) {
      this.$emit('optionClicked', option)
    },
  },
}
</script>

<style scoped>
.trigger {
  width: 100%;
  height: 100%;
  position: relative;
}

.dropdwon {
  text-align: left;
  position: absolute;
  right: 0;
  top: 3rem;
  z-index: 1;
  padding-top: 5px;
}

.dropdwon > div {
  list-style: none;
  padding: none;
  justify-content: left;
  background: indigo;
  color: white;
  height: 3rem;
  width: 6rem;
  padding-top: 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.dropdwon > div:hover {
  background: rgb(96, 0, 165);
}
</style>
