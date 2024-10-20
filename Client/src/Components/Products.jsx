import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProductId } from "../Redux/reducers/products";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting products data from Redux
  const { products } = useSelector((state) => state.products);
  const [product, setProduct] = useState();

  // find selected product using product id 
  const handleSelectProduct = async (id) => {
    console.log({ id });
    const item = await products.find((item) => item._id === id);
    setProduct(item);
  };
  // navigate product detail page with selected product  
  const handleProductId = async (id) => {
    dispatch(setProductId(id));
    navigate("/productDetail");
  };

  useEffect(() => {
    setProduct(products[0]);
  }, [products]);
  return (
    <Box
      sx={{
        width: "100%",
        p: "40px 120px",
      }}
    >
      <Typography sx={{ fontSize: "24px", fontWeight: "700", textTransform: "capitalize" }}>products</Typography>
      <Divider
        orientation="horizontal"
        variant="fill"
        sx={{ bgcolor: "#D9D9D9", height: ".5px", my: 3 }}
      />

      <Box
        sx={{
          display: "flex",
          height: "600px",

          border: ".5px solid #B9B9B9",
        }}
      >
        <Box
          sx={{
            position: "relative",
            border: ".5px solid #B9B9B9",
            p: 2,
            width: "400px",
            mr: "0px",
            textAlign: "center",
            cursor: "default",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "350px",
            }}
          >
            <img
              src={product?.images[0]}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
          </Box>
          <Typography
            sx={{ mb: 1, color: "#1AA5C3", textTransform: "uppercase", fontWeight: "bold", fontSize: "13px" }}
          >
            {product?.category}
          </Typography>
          <Typography sx={{ mb: 1, fontWeight: "600", fontSize: "18px" }}>{product?.name}</Typography>
          <Typography sx={{ fontWeight: "800", fontSize: "24px" }}>
            <span style={{ color: "#606060", fontWeight: "600", fontSize: "12px", marginRight: "10px" }}>INR</span>
            {product?.price}
          </Typography>
          <Button
            onClick={() => handleProductId(product._id)}
            sx={{
              bgcolor: "#1AA5C3",
              color: "#fff",
              textTransform: "uppercase",
              mt: 4,
              px: 3,
            }}
          >
            Add to cart
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,.7fr)",
            height: "100%",
            overflowY: "scroll",
            gap: "0px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none", 
            "scrollbar-width": "none", 
          }}
        >
          {products?.map((item, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                border: ".5px solid #B9B9B9",
                p: 2,
                cursor: "default",
                height:"300px"
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  bgcolor: "#44961D",
                  color: "#fff",
                  fontSize: "10px",
                  display: "inline",
                  p: "2px 10px",
                }}
              >
                HOT
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: "180px",
                }}
              >
                <img
                  src={item.images[0]}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt=""
                />
                <IconButton
                  onClick={() => handleSelectProduct(item._id)}
                  sx={{
                    display: "flex",
                    bgcolor: "#fff",
                    width: "35px",
                    height: "35px",
                    mt: "-20px",
                    ml: "auto",
                    boxShadow: "0 0 2px #999",
                    "&:hover": {
                      bgcolor: "#eee",
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#000", fontSize: "17px" }}
                  />
                </IconButton>
              </Box>
              <Typography
                sx={{ my: 1, color: "#1AA5C3", textTransform: "uppercase", fontWeight: "bold", fontSize: "11px" }}
              >
                {item.category}
              </Typography>
              <Typography sx={{ mb: "3px", fontWeight: "600", fontSize: "16px" }}>{item.name}</Typography>
              <Typography sx={{ fontWeight: "800", fontSize: "17px" }}>
                <span style={{ color: "#606060", fontWeight: "600", fontSize: "11px", marginRight: "10px" }}>INR</span>{" "}
                {item.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
