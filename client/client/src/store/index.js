import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newUser: {
      username: '',
      email: '',
      password: '',
      role: ''
    },
    login: false,
    usersList: [],
    baseUrl: 'http://localhost:3003'
  },
  getters: {
  },
  mutations: {
    SET_LOGIN_VALUE (state, payload) {
      state.login = payload
    },
    SET_USERSLIST (state, payload) {
      state.usersList = payload
      console.log(this.state.usersList)
    }
  },
  actions: {
    getLoginValue (context) {
      if (localStorage.getItem('accesstoken')) {
        context.commit('SET_LOGIN_VALUE', true)
      } else {
        context.commit('SET_LOGIN_VALUE', false)
      }
    },
    getUsersList (context) {
      axios({
        url: 'http://localhost:3003/api/users',
        method: 'GET',
        headers: { accesstoken: localStorage.getItem('accesstoken') }
      })
        .then(({ data }) => {
          context.commit('SET_USERSLIST', data.user)
          console.log(data.user)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
