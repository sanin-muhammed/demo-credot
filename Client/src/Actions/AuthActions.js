import axios from "../config/axiosConfig";

// Login Action
export const loginAction = async (formData) => {
  try {
    const response = await axios.post("/auth/login", formData);
    console.log("loginAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("loginAction api error response : ", error.response.data);
    return error.response.data;
  }
};

// Register Action
export const registerAction = async (formData) => {
  try {
    const response = await axios.post("/auth/register", formData);
    console.log("registerAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("registerAction api error response : ", error.response.data);
    return error.response.data;
  }
};
