<template>
  <div class="home">
    <table class="table">
    <thead class="thead-dark">
      <tr>
        <th colspan="5"><center>User Detail</center></th>
      </tr>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Created At</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">{{ userDetail.id }}</th>
        <td>{{ userDetail.name }}</td>
        <td>{{ userDetail.email }}</td>
        <td>{{ userDetail.role }}</td>
        <td>{{ userDetail.createdAt }}</td>
      </tr>
    </tbody>
</table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'UserDetail',
  computed: {
    userDetail () {
      return this.$store.state.userDetail
    }
  },
  created () {
    this.$store.dispatch('getLoginValue')
  }
}
</script>
