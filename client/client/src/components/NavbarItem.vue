<template>
 <ul class="nav justify-content-center">
  <li class="nav-item" v-if="this.$store.state.login === true">
   <router-link to='/'><a class="nav-link active">User List</a></router-link>
  </li>
  <li class="nav-item" v-if="this.$store.state.login === true" @click.prevent="handleLogut">
    <router-link to='/login'><a class="nav-link active" href="#">Sign Out</a></router-link>
  </li>
</ul>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'NavbarItem',
  methods: {
    handleLogut () {
      localStorage.removeItem('role')
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('email')
      console.log('User signed out.')
      Swal.fire({
        icon: 'success',
        title: 'OK!',
        text: 'Log Out Success'
      })
      this.$router.push({ name: 'LoginPage' })
      this.$store.dispatch('getLoginValue')
    }
  },
  created () {
    this.$store.dispatch('getLoginValue')
  }
}
</script>

<style>
</style>
