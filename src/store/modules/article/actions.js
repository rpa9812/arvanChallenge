import axios from "axios";
import { useToast } from "vue-toast-notification";

export default {
  async createArticle(context, payload) {
    const title = payload.title;
    const description = payload.description;
    const body = payload.body;
    const tagList = payload.selectedTags;

    const article = {
      title,
      description,
      body,
      tagList,
    };

    const response = await axios.post("/articles", {
      article,
    });

    if (response) {
      await context.commit("createArticle", article);
      const $toast = useToast({ position: "top-right" });
      $toast.success("Well done! Article created successfuly.");
      return true;
    }
  },
  ////////////////////////////////////////////////////////////////

  async getArticleList(context, payload) {
    const response = await axios.get("/articles", {
      params: { offset: (payload - 1) * 10, limit: 10 },
    });
    if (response) {
      await context.commit("setArticleList", response.data.articles);
      await context.commit("setArticlesCount", response.data.articlesCount);
    }
  },
  ////////////////////////////////////////////////////////////////
  async deleteArticle(context, payload) {
    const response = await axios.delete(`/articles/${payload}`);
    const $toast = useToast({ position: "top-right" });
    if (response) {
      $toast.success("Article successfully deleted.");
    }
  },
  ///////////////////////////////////////////////////////////////////
  async getSingleArticle(context, payload) {
    const response = await axios.get(`/articles/${payload}`);
    if (response) {
      await context.commit("setSingleArticle", response.data.article);
    }
  },
  ///////////////////////////////////////////////////////////////////
  async editArticle(context, [slug, data]) {
    const title = data.title;
    const description = data.description;
    const body = data.body;
    const tagList = data.selectedTags;

    const article = {
      title,
      description,
      body,
      tagList,
    };

    const response = await axios.put(`/articles/${slug}`, {
      article,
    });
    if (response) {
      const $toast = useToast({ position: "top-right" });
      $toast.success("well done! article updated successfully.");
      return true;
    }
  },
};
