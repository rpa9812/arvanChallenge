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
          <Form @submit="submitForm">
            <the-input
              v-if="!isLogin"
              v-model="formData.user"
              name="user"
              label="User"
              :rules="userSchema"
            ></the-input>
            <the-input
              v-model="formData.email"
              name="email"
              label="Email"
              :rules="emailSchema"
            ></the-input>
            <the-input
              v-model="formData.password"
              name="password"
              label="Password"
              :rules="passwordSchema"
            ></the-input>

            <the-button
              v-if="isLogin"
              buttonText="Login"
              buttonClass="btn btn-primary btn-block mt-4"
             
            >Login</the-button>
            <the-button
              v-else
              buttonText="Register"
              buttonClass="btn btn-primary btn-block mt-4"
              
            >Register</the-button>

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
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Form } from "vee-validate";

import TheInput from "../ui/TheInput.vue";
import TheButton from "../ui/TheButton.vue";

export default {
  components: { TheInput, Form, TheButton },

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
    userSchema() {
      return this.isLogin
        ? yup.string()
        : yup.string().required("User is required");
    },
    emailSchema() {
      return yup
        .string()
        .email("Invalid email format")
        .required("Email is required");
    },
    passwordSchema() {
      return yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters");
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
      this.errors = {};

      try {
        const formSchema = yup.object().shape({
          user: this.userSchema,
          email: this.emailSchema,
          password: this.passwordSchema,
        });

        await formSchema.validate(this.formData, { abortEarly: false });

        const userData = this.isLogin
          ? { email: this.formData.email, password: this.formData.password }
          : {
              username: this.formData.user,
              email: this.formData.email,
              password: this.formData.password,
            };

        const action = this.isLogin ? "login" : "signUp";
        const isSuccess = await this.$store.dispatch(action, userData);

        if (isSuccess) {
          this.$router.replace("articles");
        }
      } catch (err) {
        console.error("Validation Errors", err.errors);
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
