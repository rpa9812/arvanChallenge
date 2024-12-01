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

    try {
      await axios.post(
        "/articles",
        {
          article,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
        }
      );
      await context.commit("createArticle", article);
    } catch (err) {
      const $toast = useToast({ position: "top-right" });
      $toast.error("article couldnt be saved");
    }
  },

  async getArticleList(context, payload) {
    try {
      const response = await axios.get(
        "/articles",
        {
          params: { offset: (payload - 1) * 10, limit: 10 },
        },
        {
          headers: {
            "content-type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      await context.commit("setArticleList", response.data.articles);
      await context.commit("setArticlesCount", response.data.articlesCount);
    } catch (err) {
      const $toast = useToast({ position: "top-right" });
      $toast.error("couldnt get articles");
    }
  },
  async deleteArticle(context, payload) {

    try {
      const response = await axios.delete(`/articles/${payload}`, {
        headers: {
          "content-type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
      });
      const $toast = useToast({ position: "top-right" });
      if (response) {
        $toast.success("Article successfully deleted.");
      }
    } catch (err) {
      const $toast = useToast({ position: "top-right" });
      $toast.error("couldnt delete article");
    }
  },
  async getSingleArticle(context, payload) {

    try {
      const response = await axios.get(`/articles/${payload}`, {
        headers: {
          "content-type": "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
      });
      await context.commit("setSingleArticle", response.data.article);
    } catch (err) {
      const $toast = useToast({ position: "top-right" });
      $toast.error("couldnt get article");
    }
  },
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
    try {
      const response = await axios.put(
        `/articles/${slug}`,
        {
          article,
        },
        {
          headers: {
            "content-type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      if (response) {
        const $toast = useToast({ position: "top-right" });
        $toast.success("well done! article updated successfully.");
      }
    } catch (err) {
      const $toast = useToast({ position: "top-right" });
      $toast.error("couldnt update article");
    }
  },
};
