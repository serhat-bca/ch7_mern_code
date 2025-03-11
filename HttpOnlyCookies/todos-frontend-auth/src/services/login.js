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

export default { login };
