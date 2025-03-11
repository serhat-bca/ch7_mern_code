import axios from "axios";

const LOGIN_ENDPOINT = "/api/auth";

const login = async (userCredentials) => {
  const loginResponse = await axios.post(
    `${LOGIN_ENDPOINT}/login`,
    userCredentials,
    { withCredentials: true }
  );
  return loginResponse.data;
};

const fetchUser = async () => {
  const userInfo = await axios.get(`${LOGIN_ENDPOINT}/me`, {
    withCredentials: true,
  });
  return userInfo.data;
};

const logout = async () => {
  const logoutResponse = await axios.post(`${LOGIN_ENDPOINT}/logout`, {
    withCredentials: true,
  });
  return logoutResponse.data;
};

export default { login, fetchUser, logout };
