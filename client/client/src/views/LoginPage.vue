<template>
  <div class="login">
    <div class="login-form">
      <form @submit.prevent="handleSignInSubmit">
        <h2 class="text-center">User Web App</h2>
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input
            type="email"
            v-model="userLogin.email"
            class="form-control"
            placeholder="Email"
            required="required"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model="userLogin.password"
            class="form-control"
            placeholder="Password"
            required="required"
          />
        </div>
        <div class="form-group text-center my-2">
          <button type="submit" class="btn btn-primary btn-block">
            Log in
          </button>
        </div>
      </form>
      <p class="text-center">
        <a href="" data-bs-toggle="modal" data-bs-target="#register">
          Create an Account
        </a>
        <!-- <a href="#" @click.prevent="showModal">Create an Account</a> -->
      </p>
    </div>
    <!-- <Register
      :newUser="newUser"
      @handleRegister="handleRegister"
      @handleRegisterCancel="handleRegisterCancel"
    ></Register> -->
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LoginPage',
  data () {
    return {
      userLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSignInSubmit () {
      axios({
        url: 'http://localhost:3003/api/login',
        method: 'POST',
        data: {
          email: this.userLogin.email,
          password: this.userLogin.password
        }
      })
        .then((response) => {
          const data = response.data
          console.log(response.status, 'ini code respon')
          localStorage.setItem('accesstoken', data.accesstoken)
          localStorage.setItem('role', data.role)
          localStorage.setItem('email', data.email)
          this.$router.push({ name: 'homeView' })
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Check Your email or password'
          })
        })
    }
  },
  created () {
    if (!localStorage.getItem('accesstoken')) {
      this.$emit('changePage', 'loginPage')
    } else {
      this.$emit('changePage', 'home')
    }
  }
}
</script>

<style>
</style>
