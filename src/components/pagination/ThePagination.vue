<template>
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
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
    };
  },
  props: ["totalPages"],
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$emit('current-page-changed', this.currentPage);
        
      } else {
        return;
      }
    },
  },
};
</script>


<style scoped>
.pagination {
  justify-content: center; /* Center the pagination */
}

.page-link {
  background-color: white; /* Make the background white */
  color: black; /* Blue color for text */
  border: 1px solid #ccc; /* Light grey border */
}
.disabled-button {
  background-color: #d3d3d3 !important; /* Light gray */
  color: #888888 !important; /* Darker gray for text */
  pointer-events: none; /* Prevents click events */
  border: 1px solid #d3d3d3; /* Match border to background */
  cursor: not-allowed; /* Show 'not-allowed' cursor */
}


.page-item .page-link:hover {
  background-color: #f8f9fa; /* Light grey on hover */
}

.page-item.active .page-link {
  background-color: #007bff; /* Blue background for active page */
  color: white; /* White text for active page */
  border-color: #007bff; /* Same blue border for active page */
}
.page-link.active {
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
</style>
