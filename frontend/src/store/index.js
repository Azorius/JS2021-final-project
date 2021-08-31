import { createStore } from 'vuex'
const axios = require('axios')

function api(endpoint) {
  return `http://localhost:3000/api${endpoint}`
}
function auth(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export default createStore({
  strict: true,
  state: {
    articles: [],
    userArticles: [],
    currentUser: null,
  },
  getters: {
    latestArticles(state) {
      return state.articles.slice(-3).reverse()
    },
    articles(state) {
      return state.articles.slice().reverse()
    },
    token(state) {
      return state.currentUser.token
    },
  },
  mutations: {
    // todo: simplify
    updateArticles(state, articles) {
      state.articles = articles
    },
    setUserArticles(state, articles) {
      state.userArticles = articles
    },
    setCurrentUser(state, user) {
      console.log('user set: ', user)
      state.currentUser = user
    },
  },
  actions: {
    requestArticles(context, id = null) {
      axios.get(api(`/posts${id ? `/${id}` : ''}`)).then(response => {
        context.commit('updateArticles', response.data.data.posts)
      })
    },

    requestUserArticles({ context, getters }) {
      axios.get(api('/users/current', auth(getters.token))).then(response => {
        context.commit('setUserArticles', response.data.data.posts)
      })
    },

    addPost({ getters }, data) {
      axios
        .post(api('/posts'), data, auth(getters.token))
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    register(context, data) {
      axios
        .post(api('/users/signup'), data)
        .then(response => {
          return response.data
        })
        .catch(error => {
          return error.response.data
        })
    },
    async login(context, data) {
      return axios
        .post(api('/users/login'), data)
        .then(response => {
          context.commit('setCurrentUser', {
            token: response.data.data.token,
            name: '',
            email: response.data.data.user.email,
          })
          return response.data
        })
        .catch(error => {
          return error.response.data
        })
    },
  },
})
