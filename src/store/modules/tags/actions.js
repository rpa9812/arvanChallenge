import axios from "axios";

export default {
  async getTags(context) {
    const response = await axios.get("/tags");

    if (response) {
      context.commit("setTags", {
        tags: response.data.tags,
      });
    }
  },
};
