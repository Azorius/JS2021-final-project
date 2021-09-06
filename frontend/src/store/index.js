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
    posts: [],
    userPosts: [],
    currentUser: null,
  },
  getters: {
    latestPosts(state) {
      return state.posts.slice(0, 3)
    },
    posts(state) {
      return state.posts.slice()
    },
    userPosts(state) {
      return state.userPosts.slice()
    },
    token(state) {
      return state.currentUser.token
    },
    loginStatus(state) {
      return state.currentUser && state.currentUser.token
    },
    lastId(state) {
      if (!state.posts.length > 0) return null
      return state.posts[state.posts.length - 1].id
    },
    unsortedPosts(state) {
      return state.posts
    },
  },
  mutations: {
    // todo: simplify
    updatePosts(state, posts) {
      state.posts = posts
    },
    setuserPosts(state, posts) {
      state.userPosts = posts
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    deletePost(state, id) {
      state.posts.splice(
        state.posts.findIndex(post => post.id === id),
        1
      )
    },
    addPost(state, post) {
      state.posts.unshift(post)
      state.userPosts.unshift(post)
    },
    updatePost(state, { post, id }) {
      const idxAll = state.posts.findIndex(post => post.id === Number(id))
      state.posts[idxAll] = {
        ...state.posts[idxAll],
        ...post,
      }

      const idxOwner = state.userPosts.findIndex(post => post.id === Number(id))
      state.userPosts[idxOwner] = {
        ...state.userPosts[idxOwner],
        ...post,
      }
    },
  },
  actions: {
    requestPosts(context, id = null) {
      axios.get(api(`/posts${id ? `/${id}` : ''}`)).then(response => {
        context.commit('updatePosts', response.data.data.posts)
      })
    },

    requestUserPosts(context) {
      axios
        .get(api('/users/current'), auth(context.getters.token))
        .then(response => {
          context.commit('setuserPosts', response.data.data.user.posts)
        })
        .catch(error => {
          console.log(error)
        })
    },

    deletePost(context, id) {
      return axios
        .delete(api(`/posts/${id}`), auth(context.getters.token))
        .then(() => {
          context.commit('deletePost', id)
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
          context.commit('addPost', data.data.post)
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
        .then(({ data: { data } }) => {
          const post = {
            title: data.title,
            text: data.text,
            description: data.description,
          }
          if (data.image_url) post.imgName = data.image_url
          context.commit('updatePost', { post, id })
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

    requestMorePosts(context) {
      var id = context.getters.lastId
      return axios
        .get(api(`/posts?${id ? `startWith=${id - 1}&` : ''}limit=3`))
        .then(response => {
          let posts = [
            ...context.getters.unsortedPosts,
            ...response.data.data.posts,
          ]
          context.commit('updatePosts', posts)
          return response.data.data.posts.length > 0
        })
    },
  },
})
