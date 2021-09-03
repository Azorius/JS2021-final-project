import { createStore } from 'vuex'
const axios = require('axios')

function api(endpoint) {
  return `${process.env.VUE_APP_API_ENDPOINT}${endpoint}`
}
function auth(token, additionalHeaders) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      ...additionalHeaders,
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
      return state.articles.slice(0, 3)
    },
    articles(state) {
      return state.articles.slice()
    },
    userArticles(state) {
      return state.userArticles.slice()
    },
    token(state) {
      return state.currentUser.token
    },
    loginStatus(state) {
      return state.currentUser && state.currentUser.token
    },
    lastId(state) {
      if (!state.articles.length > 0) return null
      return state.articles[state.articles.length - 1].id
    },
    unsortedArticles(state) {
      return state.articles
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
        state.articles.findIndex(article => article.id === id),
        1
      )
    },
    addArticle(state, article) {
      state.articles.push(article)
      state.userArticles.push(article)
    },
    updateArticle(state, { article, id }) {
      const idxAll = state.articles.findIndex(
        article => article.id === Number(id)
      )
      state.articles[idxAll] = { ...state.articles[idxAll], ...article }

      const idxOwner = state.userArticles.findIndex(
        article => article.id === Number(id)
      )
      state.userArticles[idxOwner] = {
        ...state.userArticles[idxOwner],
        ...article,
      }
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

    addPost(context, { data }) {
      return axios({
        url: api(`/posts`),
        method: 'post',
        data,
        ...auth(context.getters.token, {
          'content-type': 'multipart/form-data',
        }),
      })
        .then(({ data }) => {
          context.commit('addArticle', data.data.post)
        })
        .catch(error => {
          console.log(error)
        })
    },

    updatePost(context, { data, id }) {
      return axios({
        url: api(`/posts/${id}`),
        method: 'patch',
        data,
        ...auth(context.getters.token, {
          'content-type': 'multipart/form-data',
        }),
      })
        .then(({ data }) => {
          console.log(data.data)
          context.commit('updateArticle', {
            article: { ...data.data, imgName: data.data.image_url },
            id,
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    register(context, data) {
      return axios
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

    requestMoreArticles(context) {
      var id = context.getters.lastId
      return axios
        .get(api(`/posts?${id ? `startWith=${id - 1}&` : ''}limit=3`))
        .then(response => {
          let articles = [
            ...context.getters.unsortedArticles,
            ...response.data.data.posts,
          ]
          context.commit('updateArticles', articles)
          return response.data.data.posts.length > 0
        })
    },
  },
})
