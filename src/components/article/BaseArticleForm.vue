<template>
  <the-header></the-header>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 bg-primary text-white p-3">
        <side-bar></side-bar>
      </div>

      <main class="col-md-10 p-4">
        <h2>New Article</h2>
        <Form class="row" @submit="handleSubmit">
          <div class="col-md-10">
            <the-input
              v-model="title"
              name="title"
              label="Title"
              placeholder="Title"
              :rules="titleSchema"
            ></the-input>
            <the-input
              v-model="description"
              name="description"
              label="Description"
              placeholder="Description"
              :rules="descriptionSchema"
            ></the-input>
            <the-text-area
              v-model="body"
              name="body"
              label="Body"
              rows="5"
              placeholder="Body"
              :rules="bodySchema"
            ></the-text-area>
             <the-button buttonText="Submit"></the-button>

            <div
              class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
              style="z-index: 1050"
              v-if="isLoading"
            >
              <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <aside class="col-md-2">
            <h5>Tags</h5>
            <input
              type="text"
              class="form-control mb-3"
              placeholder="New Tag"
              v-model="newTag"
              @keydown.enter="handleEnter"
            />
            <div class="border p-3">
              <ul class="list-unstyled" v-for="tag in sortedTags" :key="tag">
                <li>
                  <div>
                    <input
                      type="checkbox"
                      id="tag"
                      :value="tag"
                      v-model="selectedTags"
                      :checked="isChecked(tag)"
                    />
                    <lable class="m-1" for="tag">{{ tag }}</lable>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </Form>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as yup from "yup";
import { Form } from 'vee-validate';
import TheInput from '../ui/TheInput.vue';
import TheTextArea from "../ui/TheTextArea.vue";


export default {
  components: {

    TheInput,
    Form,
    TheTextArea

  },
  props: ["editOrCreate"],

  data() {
    return {
      currentArticle: null,
      isLoading: false,
      tagList: [],
      newTag: "",
      selectedTags: [],
      title: "",
      description: "",
      body: "",
    };
  },
  methods: {
    isChecked(item) {
      return this.selectedTags.includes(item);
    },
    handleEnter(event) {
      event.preventDefault();
      this.tags.push(this.newTag);
      this.selectedTags.push(this.newTag);
      console.log("afterPush:" + this.tags);
      this.newTag = "";
    },
    clearValidity(input) {
      this[input].isValid = true;
    },

    async handleSubmit() {
      this.isLoading = true;

      var createArticleData = {
        title: this.title,
        description: this.description,
        body: this.body,
        selectedTags: this.selectedTags,
      };
      var isSuccess = false;
      if (this.editOrCreate === "edit") {
        isSuccess = await this.$store.dispatch("article/editArticle", [
          this.$route.params.slug,
          createArticleData,
        ]);
      } else {
        isSuccess = await this.$store.dispatch(
          "article/createArticle",
          createArticleData
        );
      }

      console.log(isSuccess)
      if (isSuccess) {
        this.$router.push("/articles");
      }
    },
  },
  async created() {
    try {
      this.isLoading = true;
      await this.$store.dispatch("tag/getTags");
      if (this.editOrCreate === "edit") {
        await this.$store.dispatch(
          "article/getSingleArticle",
          this.$route.params.slug
        );
        this.currentArticle = await this.$store.getters[
          "article/currentArticle"
        ];
        this.title = this.currentArticle.title;
        this.description = this.currentArticle.description;
        this.body = this.currentArticle.body;
        this.selectedTags = this.currentArticle.tagList;
      }
      for (var i = 0; i < this.selectedTags.length; i++) {
        if (!this.tags.includes(this.selectedTags[i])) {
          this.tags.push(this.selectedTags[i]);
        }
      }
      this.isLoading = false;
    } catch (err) {
      return;
    }
  },
  computed: {
    ...mapGetters({
      tags: "tag/tags",
    }),

    sortedTags() {
      return (this.tags ?? []).slice().sort((a, b) => a.localeCompare(b));
    },
    titleSchema() {
    return this.isLogin
      ? yup.string()
      : yup.string().required("Title is required");
  },
  descriptionSchema() {
    return yup
      .string()
      .required("Description is required");
  },
  bodySchema() {
    return yup
      .string()
      .required("Body is required");
  },


  },
};
</script>

<style scoped>
.aside {
  height: 100vh;
}
.invalid label {
  color: red !important;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
