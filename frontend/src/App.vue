<template>
  <div>
    <div id="nav">
      <NavigationBar />
    </div>
    <router-view />
  </div>
</template>
<script>
import NavigationBar from '@/components/NavigationBar'

export default {
  components: {
    NavigationBar,
  },
}
</script>
