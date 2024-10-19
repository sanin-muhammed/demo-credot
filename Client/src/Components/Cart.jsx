import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Badge, Box, Button, Divider, Input, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartAction, getCartAction } from "../Actions/CartAction";
import { enqueueSnackbar } from "notistack";
import { setCart } from "../Redux/reducers/cart";
import { useNavigate } from "react-router-dom";
import { setUser } from "../Redux/reducers/user";
import { createOrderAction } from "../Actions/OrderAction";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = (id) => {
    setCartId(id);
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  // get all cart function
  const getCart = async () => {
    const response = await getCartAction(user?.userId);
    if (response.status) {
      dispatch(setCart(response.data));
    } else if (response.error) {
      // enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  
  // set user data function
  const setUserData = () => {
    const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
    if (userData) {
      dispatch(setUser(userData));
    } else {
      
      navigate("/login");
    }
  };
  
  // delete selected cart function
  const handleDeleteCart = async () => {
    const response = await deleteCartAction(cartId);
    if (response.status) {
      getCart();
      handleDeleteClose();
      enqueueSnackbar(response.message, { variant: "success" });
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
  
  // order submit function
  const handleOrderSubmit = async () => {
    const response = await createOrderAction({ userId: user.userId, products: cart, totalPrice });
    if (response.status) {
      navigate("/orderSuccess");
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (user?.userId) {
      getCart();
    } else {
      setUserData();
    }
  }, [user]);

  useEffect(() => {
    if (cart) {
      const total = cart.reduce((acc, item) => acc + item.subTotal, 0);
      setTotalPrice(total);
    }
  }, [cart]);
  return (
    <>
      <Navbar />
      <div style={{ width: "100%", display: "flex", alignItems: "start", gap: "50px", padding: "40px 120px" }}>
        <Box sx={{ width: "65%" }}>
          <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #E2E2E2",
                }}
              >
                <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>PRODUCT</th>
                <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>PRICE</th>
                <th style={{ padding: "10px", textAlign: "center", fontSize: "13px", letterSpacing: "1px" }}>
                  QUANTITY
                </th>
                <th style={{ padding: "10px", textAlign: "left", fontSize: "13px", letterSpacing: "1px" }}>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #E2E2E2",
                  }}
                >
                  <td style={{ padding: "20px 10px", display: "flex", alignItems: "center", gap: "30px" }}>
                    <Badge
                      badgeContent={
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => handleDeleteOpen(item._id)}
                        >
                          <img
                            src="./close.svg"
                            alt="close"
                          />
                        </Box>
                      }
                      sx={{
                        "& .MuiBadge-badge": {
                          minWidth: "17px",
                          height: "17px",
                          fontSize: "10px",
                          bgcolor: "#fff",
                          border: "1px solid #ddd",
                          p: 0,
                          "&:hover": {
                            border: "1px solid #777",
                            cursor: "pointer",
                          },
                        },
                      }}
                    >
                      <img
                        src={item?.product.images[0]}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                        alt=""
                      />
                    </Badge>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{item.product.name}</Typography>
                  </td>
                  <td style={{ padding: "20px 10px", fontWeight: "500", fontSize: "14px" }}>
                    INR {item.product.price}
                  </td>
                  <td style={{ padding: "20px 10px", textAlign: "center" }}>{item.count}</td>
                  <td style={{ padding: "20px 10px", fontWeight: "500", fontSize: "14px" }}>INR {item.subTotal} </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box sx={{ width: "60%", display: "flex", my: 4, height: "50px" }}>
            <TextField
              fullWidth
              label="Coupon code"
              type="text"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  height: "100%",
                },
              }}
            />
            <Button
              sx={{
                bgcolor: "#000",
                color: "#fff",
                textTransform: "uppercase",
                borderRadius: 0,
                border: 0,
                fontSize: "11px",
                width: "200px",
                height: "100%",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              apply coupon
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "35%",
            border: "1px solid #E2E2E2",
            p: "20px 30px",
          }}
        >
          <Typography sx={{ fontWeight: "900", mb: 3 }}>Cart Totals</Typography>
          {cart.map((item, index) => (
            <Box
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: "3px" }}
              key={index}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: "bold", letterSpacing: ".6px" }}>Subtotal</Typography>
              <Typography sx={{ fontSize: "12px" }}>INR {item.subTotal}</Typography>
            </Box>
          ))}
          <Divider
            orientation="horizontal"
            sx={{ bgcolor: "#DFDCDC", height: "1px", my: 1 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: "3px", my: 3 }}>
            <Typography sx={{ fontSize: "13px", fontWeight: "bold", letterSpacing: ".6px" }}>Total</Typography>
            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>INR {totalPrice}</Typography>
          </Box>
          <Button
            sx={{
              bgcolor: "#1AA5C3",
              color: "#fff",
              textTransform: "uppercase",
              borderRadius: 0,
              border: 0,
              fontSize: "12px",
              width: "100%",
              height: "50px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
            onClick={handleOrderSubmit}
          >
            PROCEED TO CHECKOUT
          </Button>
        </Box>
      </div>
      <Divider
        orientation="horizontal"
        sx={{ bgcolor: "#DFDCDC", height: "1px", my: 1, mx: "120px" }}
      />
      {/* delete product modal */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={deleteOpen}
        onClose={handleDeleteClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 600 }}>
          <h3 className="modal-title">Delete Cart Product</h3>
          <p>Are you sure you want to delete this cart product?</p>
          <Button
            onClick={handleDeleteCart}
            sx={{
              bgcolor: "red",
              color: "#fff",
              mt: 2,
            }}
          >
            Delete
          </Button>
        </ModalContent>
      </Modal>
      <Footer />
    </>
  );
};

export default Cart;
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
