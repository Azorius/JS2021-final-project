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
    setCurrentUser(state, user) {
      console.log('user set: ', user)
      state.currentUser = user
    },
  },
  actions: {
    requestArticles(context) {
      axios.get(api('/posts')).then(response => {
        context.commit('updateArticles', response.data.data.posts)
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
    register(context, { data, callback }) {
      axios
        .post(api('/users/signup'), data)
        .then(response => {
          callback(response.data)
        })
        .catch(error => {
          callback(error.response.data)
        })
    },
    login(context, { data, callback }) {
      axios
        .post(api('/users/login'), data)
        .then(response => {
          context.commit('setCurrentUser', {
            token: response.data.data.token,
            name: '',
            email: response.data.data.user.email,
          })
          callback(response.data)
        })
        .catch(error => {
          callback(error.response.data)
        })
    },
  },
})
