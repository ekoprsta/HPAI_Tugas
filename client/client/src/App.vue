<template>
  <div>
    <NavbarItem></NavbarItem>
    <router-view />
  </div>
</template>

<script>
import NavbarItem from './components/NavbarItem.vue'

export default {
  name: 'App',
  data () {
  },
  components: {
    NavbarItem
  },
  created () {
    this.$store.dispatch('getLoginValue')
  }
}
</script>
<style>
</style>
