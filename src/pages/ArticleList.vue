<template>
  <the-header></the-header>
  <div
    class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
    style="z-index: 1050"
    v-if="isLoading"
  >
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <base-modal :show="dialogIsVisible" @close="hideDialog" :title="Delete">
    <template v-slot:header>     <h5>Delete Article</h5> </template>

    <template v-slot:default>
      <p>Are you sure to delete Article?</p>

    </template>
    <template v-slot:actions>
      <button @click="hideDialog" class="btn border custom-btn m-2">No</button>
      <button
        class="btn btn-danger border custom-btn m-2"
        @click="handleRemoveArticle(slug)"
      >
        Yes
      </button>
    </template>
  </base-modal>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 bg-primary text-white p-3">
        <side-bar></side-bar>
      </div>

      <main class="col-md-10 p-4">
        <!-- Table -->
        <div class="table-container">
          <h3>All Posts</h3>
          <table class="table">
            <thead class="table-secondary">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Excerpt</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>

            <tbody
              class="bg-white"
              v-for="(article, index) in articleList"
              :key="article"
            >
              <!-- Example rows -->

              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ article.title }}</td>
                <td>{{ article.author?.username || "Unknown" }}</td>
                <td>{{ article.tagList }}</td>
                <td>{{ getFirst20Words(article.body) }}</td>
                <td>{{ formatDate(article.createdAt) }}</td>
                <td>
                  <div class="dropdown justify-content-center">
                    <button
                      class="btn btn-info dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link
                          class="dropdown-item"
                          :to="'/articles/edit/' + article.slug"
                          >Edit</router-link
                        >
                      </li>
                      <li>
                        <button
                          class="dropdown-item"
                          @click="showDialog(article.slug)"
                          href="#"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>

              <!-- Repeat rows as necessary -->
            </tbody>
          </table>
        </div>
        <div class="pagination justify-content-center mt-5">
          <button
            class="page-link"
            :disabled="currentPage === 1"
            :class="{ 'disabled-button': currentPage === 1 }"
            @click="goToPage(currentPage - 1)"
          >
            &lt;
          </button>

          <span
            v-for="(_, index) in Array.from({ length: totalPages })"
            :key="index + 1"
          >
            <button
              class="page-link"
              :class="{ active: currentPage === index + 1 }"
              @click="goToPage(index + 1)"
            >
              {{ index + 1 }}
            </button>
          </span>

          <button
            class="page-link"
            :disabled="currentPage === totalPages"
            :class="{ 'disabled-button': currentPage === totalPages }"
            @click="goToPage(currentPage + 1)"
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      dialogIsVisible: false,
      slug: null,
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    await this.$store.dispatch("article/getArticleList", this.currentPage);
    this.isLoading = false;
  },
  computed: {
    ...mapGetters({
      articleList: "article/articleList",
      articlesCount: "article/articlesCount",
    }),
    totalPages() {
      return Math.ceil(this.articlesCount / 10);
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    getFirst20Words(str) {
      return str.split(" ").slice(0, 20).join(" ") + "...";
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$store.dispatch("article/getArticleList", this.currentPage);
      } else {
        return;
      }
    },
    showDialog(index) {
      this.slug = index;
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    handleRemoveArticle() {
      this.$store.dispatch("article/deleteArticle", this.slug);
      this.articleList = this.articleList.filter(
        (article) => article.id !== this.articleToDelete
      );

      this.dialogIsVisible = false;
    },
  },
};
</script>

<style scoped>
.disabled-button {
  background-color: #d3d3d3 !important; /* Light gray */
  color: #888888 !important; /* Darker gray for text */
  pointer-events: none; /* Prevents click events */
  border: 1px solid #d3d3d3; /* Match border to background */
  cursor: not-allowed; /* Show 'not-allowed' cursor */
}
.pagination {
  justify-content: center; /* Center the pagination */
}

.page-link {
  background-color: white; /* Make the background white */
  color: black; /* Blue color for text */
  border: 1px solid #ccc; /* Light grey border */
}

.page-item .page-link:hover {
  background-color: #f8f9fa; /* Light grey on hover */
}

.page-item.active .page-link {
  background-color: #007bff; /* Blue background for active page */
  color: white; /* White text for active page */
  border-color: #007bff; /* Same blue border for active page */
}

.page-item.disabled .page-link {
  color: #ccc; /* Grey color for disabled page */
  border-color: #ccc; /* Grey border for disabled page */
}
.button.disabled {
  color: grey;
}
.custom-btn {
  width: 100px;
}
</style>
