export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.username = payload.username;
  }
};
