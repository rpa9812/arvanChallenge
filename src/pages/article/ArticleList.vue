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
    <template v-slot:header>
      <div class="container-fluid d-flex align-items-center px-3 py-2">
        <h5 class="mt-1">Delete Article</h5>
        <the-button
          @click="hideDialog"
          class="btn fs-4 fw-bold text-secondary border-0 btn-outline-primary cross-btn ms-auto"
          ><i class="bi bi-x"></i>
        </the-button>
      </div>
    </template>

    <template v-slot:default>
      <p>Are you sure to delete Article?</p>
    </template>
    <template v-slot:actions>
      <the-button @click="hideDialog" class="btn border custom-btn m-2">
        No
      </the-button>
      <the-button
        class="btn btn-danger border custom-btn m-2"
        @click="handleRemoveArticle(slug)"
      >
        Yes
      </the-button>
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
import TheButton from "@/components/ui/TheButton.vue";
import { mapGetters } from "vuex";
import ThePagination from "../../components/pagination/ThePagination.vue";
import TheTable from "../../components/table/TheTable.vue";
import { pageSize } from "../../common/index.js";

export default {
  components: {
    ThePagination,
    TheTable,
    TheButton,
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
      return Math.ceil(this.articlesCount / pageSize);
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
.cross-btn:hover,
.cross-btn:active {
  background-color: transparent;
}
</style>
