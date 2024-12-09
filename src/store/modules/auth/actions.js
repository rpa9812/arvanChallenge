import axios from "axios";

export default {
  async login(context, payload) {
    const email = payload.email;
    const password = payload.password;
    const user = {
      email,
      password,
    };

    const response = await axios.post("/users/login", {
      user,
    });
    if (response) {
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("username", response.data.user.username);

      await context.commit("setUser", {
        token: response.data.user.token,
        username: response.data.user.username,
      });
      return true;
    }
  },
  /////////////////////////////////////////////////////////////////////////
  async signUp(context, payload) {
    const username = payload.username;
    const email = payload.email;
    const password = payload.password;
    const user = {
      email,
      password,
      username,
    };

    const response = await axios.post("/users", {
      user,
    });

    if (response) {
      localStorage.setItem("token", response.data.user.token);
      localStorage.setItem("username", response.data.user.username);

      await context.commit("setUser", {
        token: response.data.user.token,
        username: response.data.user.username,
      });
      return true;
    }
  },
  ////////////////////////////////////////////////////////////////////////
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    if (token) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        username: username,
      });
    }
  },
  ////////////////////////////////////////////////////////////////////////
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    context.commit("setUser", {
      token: null,
      userId: null,
    });

  },
};
