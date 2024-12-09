<template>
  <div
    class="container d-flex d-flex justify-content-center align-items-center min-vh-100"
  >
    <div
      class="col-sm-10 col-md-8 col-lg-6 col-xl-5 d-flex justify-content-center align-items-center"
    >
      <div class="card align-items-center">
        <h1 class="card-title" v-if="isLogin">LOGIN</h1>
        <h1 class="card-title" v-else>REGISTER</h1>
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <BaseInput
      v-if="!isLogin"
      v-model="formData.user"
      name="user"
      label="User"
      placeholder=""
      :schema="schema"
      :formData="formData"
      :errors="errors.user"
      @update:modelValue="validateField('user')"
   
    />
            <!-- <div
              class="form-group"
              v-show="!isLogin"
              :class="{ invalid: errors.user }"
            >
              <label for="user" class="form-label">User</label>
              <input
                type="text"
                class="form-control"
                id="user"
                v-model.trim="formData.user"
                @input="validateField('user')"
              />
              <p class="error text-danger" v-if="errors.user">
                {{ errors.user }}
              </p>
            </div> -->
            <div class="form-group" :class="{ invalid: errors.email }">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="formData.email"
                id="email"
                class="form-control"
                @input="validateField('email')"
              />
              <p v-if="errors.email" class="error text-danger">
                {{ errors.email }}
              </p>
            </div>
            <div class="form-group" :class="{ invalid: errors.password }">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="formData.password"
                id="password"
                class="form-control"
                @input="validateField('password')"
              />
              <p v-if="errors.password" class="error text-danger">
                {{ errors.password }}
              </p>
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
              <router-link class="router-link" to="/register"
                >Register now</router-link
              >
            </p>
            <p class="mt-3" v-else>
              Already Registered?
              <router-link class="router-link" to="/login">Login</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import BaseInput from '../ui/BaseInput.vue'



export default {
  components:{BaseInput},
  
  


  props: ["logOrReg"],
  data() {
    return {
      formData: {
        user: "",
        email: "",
        password: "",
      },
      errors: {},
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
  created() {
    this.schema = yup.object().shape({
      user: this.isLogin
        ? yup.string()
        : yup.string().required("User is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
  },

  methods: {

    validateField(field) {
      this.errors[field] = null;
      this.schema
        .validateAt(field, this.formData)
        .then(() => {
          this.errors[field] = null;
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    async submitForm() {
      console.log('register clicked')
      this.errors = {};

      try {
        await this.schema.validate(this.formData, { abortEarly: false });

        this.userData = this.isLogin
          ? { email: this.formData.email, password: this.formData.password }
          : {
              username: this.formData.user,
              email: this.formData.email,
              password: this.formData.password,
            };
            //const userData = this.isLogin
          //? { email: this.formData.email, password: this.formData.password }
          //: {
           //   username: this.formData.user,
           //   email: this.formData.email,
          //    password: this.formData.password,
          //  };

        const action = this.isLogin ? "login" : "signUp";
        //const isSuccess = await this.$store.dispatch(action, userData);
        const isSuccess = await this.$store.dispatch(action, this.userData);

        if (isSuccess) {
          this.$router.replace("articles");
        }
      } catch (err) {
        err.inner.forEach((error) => {
          this.errors[error.path] = error.message;
        });
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
.card-body {
  width: 100%;
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
.error {
  color: red; /* Red color for error text */
}
.invalid label {
  color: red !important;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
.router-link {
  color: black;
  font-weight: bold;
  text-decoration: none;
}
</style>
