import axios from "axios";
import { useToast } from "vue-toast-notification";
export default {
  async getTags(context) {
    try {
      const response = await axios.get("/tags", {
        headers: {
          "content-type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      if (response) {
        context.commit("setTags", {
          tags: response.data.tags,
        });
      }
    } catch (error) {
      const $toast = useToast({ position: "top-right" });
      $toast.error("couldent load tags");
    }
  },
};
