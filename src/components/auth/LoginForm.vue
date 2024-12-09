<template>
  <div class="container  d-flex d-flex justify-content-center align-items-center min-vh-100">
    <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 d-flex justify-content-center align-items-center">
      <div class="card align-items-center">
        <h1 class="card-title" v-if="isLogin">LOGIN</h1>
        <h1 class="card-title" v-else>REGISTER</h1>
        <div class="card-body">
          


          <form @submit.prevent="submitForm">
            <div
              class="form-group"
              v-show="!isLogin"
              :class="{ invalid: !user.isValid}"
              
            >
              <label for="user" class="form-label">User</label>
              <input
                type="text"
                class="form-control"
                id="user"
                v-model.trim="user.val"
                @blur="clearValidity('user')"
              />
              <p class="text-danger" v-if="!user.isValid">Required field</p>
            </div>
            <div class="form-group" :class="{ invalid: !email.isValid }">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model.trim="email.val"
                @blur="clearValidity('email')"
              />
              <p class="text-danger" v-if="!email.isValid">Required field</p>
            </div>
            <div class="form-group" :class="{ invalid: !password.isValid }">
              <label for="password" class="form-label">password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model.trim="password.val"
                @blur="clearValidity('password')"
              />
              <p class="text-danger" v-if="!password.isValid">Required field</p>
            </div>
            <button
              type="submit"
              class="btn btn-primary btn-block mt-4"
              v-if="isLogin"
            >
              Login
            </button>
            <button type="submit" class="btn btn-primary btn-block mt-4" v-else>
              Register
            </button>

            <p v-if="isLogin" class="mt-3">
              Dont have account?
              <router-link class="router-link" to="/register">Register now</router-link>
            </p>
            <p class="mt-3" v-else>
              Already Registered? <router-link class="router-link" to="/login">Login</router-link>
            </p>
          </form>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: ["logOrReg"],
 

  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
      user: {
        val: "",
        isValid: true,
      },
      formIsValid: true,
    };
  },

  computed: {
    isLogin() {
      if (this.logOrReg === "login") {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === "" || !this.email.val.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val === "" || this.password.val.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
      if (!this.isLogin && this.user.val === "") {
        this.user.isValid = false;
        this.formIsValid = false;
      }
    },

    async submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      if (this.isLogin) {
        var userData = {
          email: this.email.val,
          password: this.password.val,
        };
        const isSuccess = await this.$store.dispatch("login", userData);
        if(isSuccess){
          this.$router.replace("articles");

        }
      } else {
        userData = {
          username: this.user.val,
          email: this.email.val,
          password: this.password.val,
        };
        const isSuccess = await this.$store.dispatch("signUp", userData);
        if(isSuccess){
          this.$router.replace("articles");

        }
        
      }
    },
  },
};
</script>

<style scoped>
.btn-block {
  width: 100%;
}
.card-title {
  color: #777777;
  text-align: center;
}
.card {
  background-color: #eceeef;
  width: 100%;
  max-width: 400px;
  border-radius: 0px;
}
.card-body{
  width:100%;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {

  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}
.invalid label {
  color: red !important;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
  
}
.router-link{
  color:black;
  font-weight: bold;
  text-decoration: none;
}
</style>
