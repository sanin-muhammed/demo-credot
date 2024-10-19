import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Divider, Menu, Tooltip, MenuItem, Avatar, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logout from "@mui/icons-material/Logout";
import { setUser } from "../Redux/reducers/user";
import { setCart } from "../Redux/reducers/cart";
import { setOrders } from "../Redux/reducers/orders";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartCount } = useSelector((state) => state.cart);
  const { ordersCount } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    dispatch(setUser(null));
    dispatch(setCart([]));
    dispatch(setOrders([]));
    navigate("/login");
  };

  return (
    <header>
      <img 
        onClick={()=> navigate("/")}
        src="../Logo.svg"
        alt="logo"
        width="120px"
        style={{cursor:"pointer"}}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Profile */}
        {user && user.userId && (
          <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
            <Tooltip title="user">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ mx: 2, width: 40, height: 40, bgcolor: "#f8f8f8" }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <img
                  width={"25px"}
                  src="./user.svg"
                  alt=""
                />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {/* Menu items */}
          <MenuItem onClick={handleClose}>
            <Avatar /> {user?.email}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <Divider
          orientation="vertical"
          variant="fill"
          flexItem
        />

        {/* Cart */}
        <Box sx={{ px: 1.5 }}>
          <Tooltip title="Cart">
            <IconButton
              onClick={() => {
                if (cartCount && cartCount > 0) {
                  navigate("/cart");
                }
              }}
              sx={{
                bgcolor: "#f8f8f8",
              }}
            >
              <Badge
                badgeContent={cartCount}
                sx={{
                  top: "-10px",
                  left: "25px",
                  "& .MuiBadge-badge": {
                    minWidth: "17px",
                    height: "17px",
                    fontSize: "10px",
                    bgcolor: "#1AA5C3",
                    color: "#fff",
                    p: 0,
                  },
                }}
              />
              <ShoppingCartIcon sx={{ color: "#000" }} />
            </IconButton>
          </Tooltip>
        </Box>
        {/* Orders */}
        <Box sx={{ px: 1.5 }}>
          <Tooltip title="Orders">
            <IconButton
              onClick={() => {
                if (ordersCount && ordersCount > 0) {
                  navigate("/orders");
                }
              }}
              sx={{
                bgcolor: "#f8f8f8",
              }}
            >
              <Badge
                badgeContent={ordersCount}
                sx={{
                  top: "-10px",
                  left: "25px",
                  "& .MuiBadge-badge": {
                    minWidth: "17px",
                    height: "17px",
                    fontSize: "10px",
                    bgcolor: "#1AA5C3",
                    color: "#fff",
                    p: 0,
                  },
                }}
              />
              <img
                src="../cart.svg"
                alt=""
              />
            </IconButton>
          </Tooltip>
        </Box>

        
      </Box>
    </header>
  );
};

export default Navbar;
