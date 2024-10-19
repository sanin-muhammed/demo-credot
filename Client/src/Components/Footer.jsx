import { Box, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  const icons = [{ icon: faFacebookF }, { icon: faTwitter }, { icon: faLinkedinIn }, { icon: faYoutube }];
  return (
    <footer>
      <img
        onClick={()=> navigate("/")}
        src="../Logo.svg"
        alt="logo"
        width="120px"
        style={{cursor:"pointer"}}
      />
      <div className="flex_div">
        <div>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
            connected with us
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              pt: 1.5,
            }}
          >
            {icons.map((item, index) => (
              <IconButton
                sx={{
                  bgcolor: "#E9E9E9",
                  width: "40px",
                  height: "40px",
                }}
                key={index}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ color: "#000", fontSize: "14px" }}
                />
              </IconButton>
            ))}
          </Box>
        </div>
        <div>
          <Typography sx={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
            important Links
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              p: "24px 0 10px",
            }}
          >
            <Typography
              sx={{
                color: "#777777",
                fontSize: "12px",
                letterSpacing: "1px",
                "&:hover": { cursor: "pointer", color: "#1890a1" },
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              sx={{
                color: "#777777",
                fontSize: "12px",
                letterSpacing: "1px",
                "&:hover": { cursor: "pointer", color: "#1890a1" },
              }}
            >
              Privacy Policy
            </Typography>
            <Typography
              sx={{
                color: "#777777",
                fontSize: "12px",
                letterSpacing: "1px",
                "&:hover": { cursor: "pointer", color: "#1890a1" },
              }}
            >
              Help & FAQs
            </Typography>
          </Box>
        </div>
        <Divider
          orientation="vertical"
          sx={{ bgcolor: "#D9D9D9", width: ".5px", height: "100px" }}
        />
        <div>
          <IconButton
            sx={{
              bgcolor: "#1AA5C3",
              width: "40px",
              height: "40px",
              mb: 0.3,
              "&:hover": {
                bgcolor: "#1890a1",
              },
            }}
          >
            <FontAwesomeIcon
              icon={faPhone}
              style={{ color: "#fff", fontSize: "14px" }}
            />
          </IconButton>

          <Typography sx={{ color: "#1b1b1b", fontSize: "12px", letterSpacing: "1px" }}>Helpline</Typography>
          <Typography sx={{ pb: 1.1, color: "#000", fontWeight: 900, fontSize: "20px", letterSpacing: "1px" }}>
            1800 456 84788
          </Typography>
        </div>
      </div>
      <Divider
        orientation="horizontal"
        variant="fullWidth"
        sx={{ bgcolor: "#DCDCDC", height: "1px", mt: 7, mb: 3 }}
      />
      <Typography sx={{ color: "#777777", fontSize: "12px", letterSpacing: "1px", textAlign: "center" }}>
        Arab Deals © 2023. All Rights Reserved
      </Typography>
    </footer>
  );
};

export default Footer;
