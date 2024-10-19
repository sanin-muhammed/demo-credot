import axios from "../config/axiosConfig";

// add to cart Action
export const addToCartAction = async (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`/cart/add`, data, { headers });
    console.log("addToCartAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("addToCartAction api error response : ", error.response.data);
    return error.response.data;
  }
};

// get all cart action
export const getCartAction = async (userId) => {
  try {
    const response = await axios.get(`/cart/${userId}`);
    console.log("getCartAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("getCartAction api error response : ", error.response.data);
    return error.response.data;
  }
};

// delete cart action
export const deleteCartAction = async (id) => {
  try {
    const response = await axios.delete(`/cart/delete/${id}`);
    console.log("deleteCartAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("deleteCartAction api error response : ", error.response.data);
    return error.response.data;
  }
};
