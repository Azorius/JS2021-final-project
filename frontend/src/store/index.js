import { createStore } from 'vuex'
const axios = require('axios')

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
  },
  mutations: {
    // todo: simplify
    updateArticles(state, { articles }) {
      state.articles = articles
    },
    setCurrentUser(state, user) {
      console.log('user set: ', user)
      state.currentUser = user
    },
  },
  actions: {
    requestArticles(context) {
      axios
        .get('http://localhost:3000/api/posts')
        .then(response => {
          context.commit('updateArticles', {
            articles: response.data.data.posts,
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    addPost(context, data) {
      console.log(context)
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/posts',
        data: data,
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    register(context, { email, name, password, callback }) {
      console.log(context)
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/signup',
        data: { email, name, password },
      })
        .then(response => {
          callback(response.data)
        })
        .catch(error => {
          callback(error.response.data)
        })
    },
    login(context, { email, password, callback }) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/login',
        data: { email, password },
      })
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
