import axios from "../config/axiosConfig";

// Get all Products Action
export const getAllProductsAction = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get("/products/get_products", { headers });
    console.log("getAllProductsAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("getAllProductsAction api error response : ", error.response.data);
    return error.response.data;
  }
};
// Get Product by id Action
export const getProductAction = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`/products/${id}`, { headers });
    console.log("getProductAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("getProductAction api error response : ", error.response.data);
    return error.response.data;
  }
};
