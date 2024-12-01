<template>
  <the-header></the-header>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 bg-primary text-white p-3">
        <side-bar></side-bar>
      </div>

      <main class="col-md-10 p-4">
        <h2>New Article</h2>
        <form class="row" @submit.prevent="handleSubmit">
          <div class="col-md-10">
            <div class="mb-3 form-group" :class="{ invalid: !title.isValid }">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                id="title"
                class="form-control"
                placeholder="Current Title"
                v-model.trim="title.val"
                @blur="clearValidity('title')"
              />
              <p class="text-danger" v-if="!title.isValid">Required field</p>
            </div>
            <div
              class="mb-3 form-group"
              :class="{ invalid: !description.isValid }"
            >
              <label for="description" class="form-label">Description</label>
              <textarea
                id="description"
                class="form-control"
                rows="3"
                placeholder="Current Description"
                v-model.trim="description.val"
                @blur="clearValidity('description')"
              ></textarea>
              <p class="text-danger" v-if="!description.isValid">
                Required field
              </p>
            </div>
            <div class="mb-3 form-group" :class="{ invalid: !body.isValid }">
              <label for="body" class="form-label">Body</label>
              <textarea
                id="body"
                class="form-control"
                rows="5"
                placeholder="Current Body"
                v-model.trim="body.val"
                @blur="clearValidity('body')"
              ></textarea>
              <p class="text-danger" v-if="!body.isValid">Required field</p>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
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
              <ul class="list-unstyled" v-for="tag in tags" :key="tag">
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
        </form>
      </main>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/layout/SideBar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    SideBar,
  },
  props: ["editOrCreate"],

  data() {
    return {
      currentArticle: null,
      isLoading: false,
      tagList: [],
      newTag: "",
      selectedTags: [],
      title: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      body: {
        val: "",
        isValid: true,
      },

      formIsValid: true,
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
    validateForm() {
      console.log("validation");
      this.formIsValid = true;
      if (this.title.val === "") {
        this.title.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (this.body.val === "") {
        this.body.isValid = false;
        this.formIsValid = false;
      }
    },
    async handleSubmit() {
      this.isLoading = true;
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      var createArticleData = {
        title: this.title.val,
        description: this.description.val,
        body: this.body.val,
        selectedTags: this.selectedTags,
      };
      if(this.editOrCreate === 'edit'){
        await this.$store.dispatch('article/editArticle',[this.$route.params.slug,createArticleData])
      }else{
        await this.$store.dispatch("article/createArticle", createArticleData);
      }

     
      this.$router.push('/articles')
      // this.isLoading = false;
      // this.title.val = "";
      // this.description.val = "";
      // this.body.val = "";
      // this.selectedTags = [];
      console.log(createArticleData);
    },
  },
  async created() {
    try {
      this.isLoading = true;
      await this.$store.dispatch("tag/getTags");
      if (this.editOrCreate === "edit") {
        await this.$store.dispatch("article/getSingleArticle",this.$route.params.slug);
        this.currentArticle = await this.$store.getters[
          "article/currentArticle"
        ];
        this.title.val = this.currentArticle.title;
        this.description.val = this.currentArticle.description;
        this.body.val = this.currentArticle.body;
        this.selectedTags = this.currentArticle.tagList
      }
      this.isLoading = false;

      // this.tagList =await  this.$store.getters["tag/tags"]
      // console.log('tagList:' +this.tagList)
    } catch (err) {
      return;
    }
  },
  computed: {
    ...mapGetters({
      tags: "tag/tags",
    }),

    //  tags() {
    //   console.log('computed')

    //     let sortedTags = []

    //     sortedTags = this.tagList.slice().sort((a, b) =>
    //     a.localeCompare(b))

    //      return sortedTags

    //  }
  },
  beforeUpdate() {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    this.tags.slice().sort((a, b) => a.localeCompare(b));
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
