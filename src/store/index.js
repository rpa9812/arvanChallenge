import { createStore } from "vuex";
import authModule from "./modules/auth/index.js";
import tagModule from "./modules/tags/index.js";
import articleModule from "./modules/article/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    tag: tagModule,
    article: articleModule,
  },
});

export default store;
