import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    articles: [
      {
        id: 1,
        title: 'Title 1',
        description: 'Test description 1',
        text: 'Test article text 1',
      },
      {
        id: 1,
        title: 'Title 2',
        description: 'Test description 2',
        text: 'Test article text 2',
      },
      {
        id: 1,
        title: 'Title 3',
        description: 'Test description 3',
        text: 'Test article text 3',
      },
      {
        id: 1,
        title: 'Title 4',
        description: 'Test description 4',
        text: 'Test article text 4',
      },
    ],
  },
  getters: {
    latestArticles(state) {
      return state.articles.slice(-5).reverse()
    },
    articles(state) {
      return state.articles.slice().reverse()
    },
  },
})
