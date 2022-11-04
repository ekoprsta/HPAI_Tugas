<template>
  <div class="home">
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th colspan="4"><center>List Users</center></th>
      </tr>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(userList, i) in usersList" :key="i">
        <th scope="row">{{ userList.id }}</th>
        <td>{{ userList.name }}</td>
        <td>{{ userList.email }}</td>
        <td>
          <button type="button" class="btn btn-danger" @click.prevent="handleDelete(userList.id)">Delete</button> ||
          <button type="button" class="btn btn-primary" @click.prevent="showDetailUser(userList.id)">Details</button>
        </td>
      </tr>
    </tbody>
</table>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'HomeView',
  methods: {
    handleDelete (id) {
      if (localStorage.getItem('role') === 'admin') {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You wont be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Deleted!', 'User has been deleted.', 'success')
            axios({
              url: `http://localhost:3003/api/users/${id}`,
              method: 'DELETE',
              headers: {
                accesstoken: localStorage.getItem('accesstoken')
              }
            })
              .then((response) => {
                this.$router.push({ name: 'homeView' })
                this.$store.dispatch('getUsersList')
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Only admin able to delete User'
        })
      }
    },
    showDetailUser (id) {
      this.$store.dispatch('getUserDetail', id)
      this.$router.push({ name: 'UserDetail', params: { id } })
    }
  },
  computed: {
    usersList () {
      return this.$store.state.usersList
    }
  },
  created () {
    this.$store.dispatch('getLoginValue')
    this.$store.dispatch('getUsersList')
  }
}
</script>
