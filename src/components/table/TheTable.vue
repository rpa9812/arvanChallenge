<template>
  <div class="table-container">
    <h3>All Posts</h3>
    <table class="table">
      <thead class="table-secondary">
        <tr>
          <th v-for="(title,index) in headerTitles" :key="index">{{ title }}</th>
        </tr>
      </thead>

      <tbody
        class="bg-white"
        v-for="(article, index) in articleList"
        :key="article"
      >
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
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["headerTitles", "articleList"],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return new Intl.DateTimeFormat("en-US", options).format(date);
    },
    getFirst20Words(str) {
      return str.split(" ").slice(0, 20).join(" ") + "...";
    },
    showDialog(slug){
        this.$emit('delete-button-click', slug);
    }
  },
};
</script>
