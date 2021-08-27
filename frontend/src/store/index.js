import { createStore } from 'vuex'
const axios = require('axios')

export default createStore({
  strict: true,
  state: {
    articles: [],
  },
  getters: {
    latestArticles(state) {
      return state.articles.slice(-5).reverse()
    },
    articles(state) {
      return state.articles.slice().reverse()
    },
  },
  mutations: {
    updateArticles(state, { articles }) {
      state.articles = articles
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
  },
})
