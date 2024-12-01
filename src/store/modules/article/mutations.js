export default {
  createArticle(state, payload) {
    state.articles = payload.articles;
  },
  setArticleList(state, payload) {
    state.articles = payload;
  },
  setArticlesCount(state, payload) {
    state.articlesCount = payload;
  },
  setSingleArticle(state, payload) {
    state.currentArticle = payload;
  }
};
