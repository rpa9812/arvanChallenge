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
    <template v-slot:header> <h5>Delete Article</h5> </template>

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
        <the-table
          :article-list="articleList"
          :header-titles="tableHeaders"
          @delete-button-click="showDialog"
        ></the-table>
        <!--Pagination-->
        <the-pagination
          :current-page="currentPage"
          :totalPages="totalPages"
          @current-page-changed="handlePageChange"
        ></the-pagination>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ThePagination from "../../components/pagination/ThePagination.vue";
import TheTable from "../../components/table/TheTable.vue";

export default {
  components: {
    ThePagination,
    TheTable,
  },
  data() {
    return {
      currentPage: 1,
      dialogIsVisible: false,
      slug: null,
      isLoading: false,
      tableHeaders: ["#", "Title", "Author", "Tags", "Excerpt", "Created", ""],
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
    handlePageChange(newPage) {
      this.$store.dispatch("article/getArticleList", newPage);
    },
    showDialog(index) {
      this.slug = index;
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    async handleRemoveArticle() {
      this.isLoading = true;
      await this.$store.dispatch("article/deleteArticle", this.slug);
      await this.$store.dispatch("article/getArticleList", this.currentPage);
      this.isLoading = false;

      this.dialogIsVisible = false;
    },
  },
};
</script>

<style scoped>
.custom-btn {
  width: 100px;
}
</style>
