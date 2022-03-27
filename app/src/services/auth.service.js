import axios from "axios";
import { API_URL } from "../utils/constants";

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/login", {
      email: email,
      password: password,
    });

    const user = response.data;

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async (name, email, password) => {
  try {
    const response = await axios.post(API_URL + "/register", {
      name: name,
      email: email,
      password: password,
    });

    const newUser = response.data;

    return newUser;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  login: login,
  register: register,
};

export default AuthService;
