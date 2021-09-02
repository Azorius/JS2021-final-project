<template>
  <div class="view-header">
    <h1>{{ text }}</h1>
  </div>
</template>
<script>
export default {
  name: 'ViewHeader',
  props: {
    text: String,
  },
}
</script>

<style scoped>
.view-header {
  margin-top: 4rem;
}
</style>
