<template>
  <header>
    <header class="navbar text-secondary px-3 py-2">
      <div class="container-fluid d-flex align-items-center">
        <h3 class="text-light">Arvan Challenge</h3>
        <span class="navbar-text text-light ms-3">
          Welcome, {{ username }}
        </span>
        <router-link class="ms-auto" to="/" v-if="isLoggedIn" @click="logout"
          >Logout</router-link
        >
        <router-link class="ms-auto" to="/login" v-else>LogIn</router-link>
      </div>
    </header>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: null,
    };
  },
  created() {
    this.username = this.$store.getters.username;
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userName() {
      return this.username;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background: #373a3c;
  color: #dddddd;
  display: flex;
}

header a {
  text-decoration: none;
  color: #51a8e2;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #51a8e2;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
