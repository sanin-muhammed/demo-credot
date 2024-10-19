import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);
  return (
    <>
      <Navbar />
      <div
        style={{
          background: "#F9F9F9",
          width: "100vw",
          height: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Box
          sx={{
            width: "150px",
            height: "150px",
            bgcolor: "#F0EEEE",
            borderRadius: "50%",
            p: 3,
          }}
        >
          <Box
            className="successBox"
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#44961D",
              borderRadius: "50%",
            }}
          >
            <DoneIcon sx={{ fontSize: 50, color: "#fff" }} />
          </Box>
        </Box>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", mt: 3, letterSpacing: "1px" }}>
          Your order has been placed successfully.
        </Typography>
        <Typography sx={{ fontSize: "11px", color: "#777777" }}>
          Lorem ipsum dolor sit amet consectetur. Sapien ut libero sed lacinia egestas placera
        </Typography>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;
