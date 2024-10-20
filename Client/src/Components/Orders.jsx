import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrders } from "../Redux/reducers/orders";
import { setUser } from "../Redux/reducers/user";
import { getAllOrdersAction } from "../Actions/OrderAction";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extract datas from redux
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.orders);

  const [orderId, setOrderId] = useState("");

  // get all orders function
  const getOrders = async () => {
    const response = await getAllOrdersAction(user?.userId);
    if (response.status) {
      dispatch(setOrders(response.data));
    } else if (response.error) {
      dispatch(setOrders([]));
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // set user data from local storage to the Redux
  const setUserData = () => {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
    if (userData) {
      dispatch(setUser(userData));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getOrders();
    } else {
      setUserData();
    }
  }, [user]);

  return (
    <>
      {/* navbar component */}
      <Navbar />
      <div style={{ padding: "40px 120px" }}>
        <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #E2E2E2",
              }}
            >
              <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>PRODUCTS</th>
              <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>
                TOTAL PRICE
              </th>
              <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>ORDER DATE</th>
              <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>
                ORDER STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #E2E2E2",
                }}
              >
                <td
                  style={{
                    padding: "20px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    overflowX: "scroll",
                    scrollbarWidth: "none",
                    maxWidth: "400px",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {item.products?.map((product, index) => (
                    <img
                      key={index}
                      src={product.product.images[0]}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      alt="images"
                    />
                  ))}
                </td>
                <td style={{ padding: "20px 10px" }}>INR {item.totalPrice}</td>
                <td style={{ padding: "20px 10px", fontWeight: "500", fontSize: "14px" }}>
                  {new Date(item.orderDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td style={{ padding: "20px 10px", fontWeight: "500", fontSize: "14px" }}>{item.orderStatus} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* footer component */}
      <Footer />
    </>
  );
};

export default Orders;
