<template>
  <div class="dropdwon">
    <ul>
      <li v-for="option in options" :key="`option-${option.name}`">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    options: Array,
  },
}
</script>

<style scoped>
.dropdwon {
  text-align: left;
  position: absolute;
  right: 0;
  top: 9rem;
  background: rgb(82, 44, 87);
  z-index: 1;
  padding: 0px;
}

.dropdwon > ul {
  list-style: none;
  padding: none;
  justify-content: left;
  padding: 0px;
  margin: 0px;

  border: 1px solid darkred;
}
.dropdwon > ul > li {
  color: white;
}
</style>
