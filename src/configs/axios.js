import axios from "axios";
import { useToast } from "vue-toast-notification";

axios.defaults.baseURL = "http://5.34.201.164:3000/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const $toast = useToast({ position: "top-right" });

    if (error.code === "ERR_NETWORK") {
      $toast.error("Something went wrong.");
      return;
    }

    const { data, status } = error.response;
    const errors = data.errors;

    let messages = [];

    switch (status) {
      case 400:
        $toast.error("400");
        break;

      case 401:
        $toast.error("Your token has been expired.");
        this.$router.push('/login')
        break;

      case 500:
        $toast.error("Server error");
        break;
      default:
        if (data.message) messages = [data.message];
        else if (errors)
          messages = Object.keys(errors).map((key) => key + " " + errors[key]);

        if (!messages.length) $toast.error("Something went wrong.");
        else $toast.error(messages.join("<br/>"));

        return;
    }
    return Promise.reject(error);
  }
);
