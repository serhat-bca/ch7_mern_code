import axios from "axios";

const LOGIN_ENDPOINT = "/api/login";

const login = async (userCredentials) => {
  const loginResponse = await axios.post(LOGIN_ENDPOINT, userCredentials);
  return loginResponse.data;
};

export default { login };
