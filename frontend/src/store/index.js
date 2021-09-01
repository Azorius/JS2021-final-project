import { createStore } from 'vuex'
const axios = require('axios')

function api(endpoint) {
  return `${process.env.VUE_APP_API_ENDPOINT}${endpoint}`
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
    userArticles(state) {
      return state.userArticles.slice().reverse()
    },
    token(state) {
      return state.currentUser.token
    },
    loginStatus(state) {
      return state.currentUser && state.currentUser.token
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
      state.currentUser = user
    },
    deleteArticle(state, id) {
      state.articles.splice(
        state.articles.findIndex(article => article.id == id),
        1
      )
    },
  },
  actions: {
    requestArticles(context, id = null) {
      axios.get(api(`/posts${id ? `/${id}` : ''}`)).then(response => {
        context.commit('updateArticles', response.data.data.posts)
      })
    },

    requestUserArticles(context) {
      axios
        .get(api('/users/current'), auth(context.getters.token))
        .then(response => {
          context.commit('setUserArticles', response.data.data.user.posts)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deletePost(context, id) {
      return axios
        .delete(api(`/posts/${id}`), auth(context.getters.token))
        .then(() => {
          context.commit('deleteArticle', id)
        })
    },

    sendPost(context, { data, id = null }) {
      return axios({
        url: api(`/posts${id ? `/${id}` : ''}`),
        method: id ? 'patch' : 'post',
        data,
        ...auth(context.getters.token),
      })
        .then(response => {
          return response
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
    login(context, data) {
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
    logout(context) {
      return axios
        .post(api('/users/logout'), null, auth(context.getters.token))
        .then(() => {
          context.commit('setCurrentUser', null)
        })
    },
  },
})
