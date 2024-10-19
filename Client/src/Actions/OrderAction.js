import axios from "../config/axiosConfig";

// create order Action
export const createOrderAction = async (data) => {
  try {
    const response = await axios.post("/orders/create", data);
    console.log("createOrderAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("createOrderAction api error response : ", error.response.data);
    return error.response.data;
  }
};
// get all orders Action
export const getAllOrdersAction = async (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`/orders/${userId}`, { headers });
    console.log("getAllOrdersAction api success response : ", response.data);
    return response.data;
  } catch (error) {
    console.log("getAllOrdersAction api error response : ", error.response.data);
    return error.response.data;
  }
};
