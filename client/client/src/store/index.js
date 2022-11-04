import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userDetail: {
      name: '',
      email: '',
      password: '',
      role: '',
      createdAt: ''
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
    },
    SET_USERDETAIL (state, payload) {
      state.userDetail = payload
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
    },
    getUserDetail (context, payload) {
      axios({
        url: `http://localhost:3003/api/users/${payload}`,
        method: 'GET',
        headers: { accesstoken: localStorage.getItem('accesstoken') }
      })
        .then(({ data }) => {
          context.commit('SET_USERDETAIL', data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
