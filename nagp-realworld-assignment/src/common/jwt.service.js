export const getToken = () => {
  return JSON.parse(window.localStorage.getItem("vuex")).token;
};

export default { getToken };
