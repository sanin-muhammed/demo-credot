import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { getProductAction } from "../Actions/ProductAction";
import { setProduct } from "../Redux/reducers/productDetail";
import { enqueueSnackbar } from "notistack";
import { addToCartAction } from "../Actions/CartAction";

const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extracting datas from Redux
  const { productId } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.productDetail);
  const { user } = useSelector((state) => state.user);


  const [imageIndex, setImageIndex] = useState(0);
  const [colour, setColour] = useState("black");
  const [memory, setMemory] = useState("256 GB");
  const [count, setCount] = useState(1);

  // sample datas
  const colours = ["black", "pink", "green", "gray", "darkblue"];
  const memories = ["256 GB", "512 GB", "1 TB", "128 GB"];

  // get product function
  const getProduct = async () => {
    const response = await getProductAction(productId);
    if (response.status) {
      dispatch(setProduct(response.data));
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // submit add to cart Action
  const handleSubmit = async () => {
    const response = await addToCartAction({ userId: user.userId, product, colour, memory, count });
    if (response.status) {
      enqueueSnackbar(response.message, { variant: "success" });
      navigate("/");
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct();
    } else {
      navigate("/");
    }
  }, [productId]);
  return (
    <>
    {/* navbar component */}
      <Navbar />
      <div style={{ display: "flex", padding: "40px 120px", gap: "40px" }}>
        <Box sx={{ width: "400px" }}>
          <Box sx={{ width: "100%", height: "400px", mb: 3 }}>
            {product?.images?.length > 0 && (
              <img
                src={product.images[imageIndex]}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: "3px solid #eee",
                  borderRadius: "6px",
                }}
                alt="Product"
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {product?.images?.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: "100px",
                  minWidth: "100px",
                  height: "100px",
                  border: "3px solid #eee",
                  borderRadius: "5px",
                  cursor: "pointer",
                  "&:hover": {
                    border: "3px solid #1AA5C3",
                  },
                }}
                onClick={() => setImageIndex(index)}
              >
                <img
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: "60%",
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {product?.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, my: 1 }}>
            <img
              src="../reviewIcon.svg"
              style={{ width: "60px" }}
            />
            <Typography sx={{ fontSize: "11px", color: "#999999" }}>{"( There are no reviews yet )"}</Typography>
          </Box>
          <Typography sx={{ fontWeight: "600", fontSize: "24px", my: 2 }}>
            <span style={{ color: "#606060", fontWeight: "600", fontSize: "12px", marginRight: "10px" }}>INR</span>
            {product?.price}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#999999" }}>{product?.description}</Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              textTransform: "capitalize",
              mt: 2,
              mb: 1,
            }}
          >
            colour : {colour}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {colours.map((item, index) => (
              <IconButton
                key={index}
                onClick={() => setColour(item)}
                sx={{
                  display: "flex",
                  bgcolor: "#f8f8f8",
                  width: "45px",
                  height: "45px",
                  p: "8px",
                  "&:hover": {
                    bgcolor: "#eee",
                    p: "10px",
                  },
                  transition: ".1s ease",
                }}
              >
                <span
                  style={{
                    width: "100%",
                    height: "100%",
                    background: item,
                    borderRadius: "50%",
                  }}
                ></span>
              </IconButton>
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "bold",
              textTransform: "capitalize",
              mt: 4,
              mb: 1,
            }}
          >
            Internal Memory
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {memories.map((item,index) => (
              <Button
                key={index}
                onClick={() => setMemory(item)}
                sx={{
                  bgcolor: item === memory ? "#000" : "#fff",
                  color: item === memory ? "#fff" : "#000",
                  textTransform: "uppercase",
                  px: 3,
                  borderRadius: 0,
                  boxShadow: "0 0 1px #000",
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Divider
            orientation="horizontal"
            variant="fullWidth"
            sx={{ bgcolor: "#999", height: "1px", mt: 7, mb: 3 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #ddd", height: "45px" }}>
              <Button
                sx={{
                  height: "100%",
                  border: "1px solid #ddd",
                  borderRadius: 0,
                  color: "#000",
                  fontWeight: "900",
                }}
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                -
              </Button>
              <Typography
                sx={{
                  width: "40px",
                  height: "100%",
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {count}
              </Typography>
              <Button
                sx={{
                  height: "100%",
                  border: "1px solid #ddd",
                  borderRadius: 0,
                  color: "#000",
                  fontWeight: "900",
                }}
                onClick={() => setCount(count + 1)}
              >
                +
              </Button>
            </Box>
            <Button
              onClick={() => handleSubmit()}
              sx={{
                bgcolor: "#000",
                color: "#fff",
                textTransform: "uppercase",
                px: 3,
                borderRadius: 0,
              }}
            >
              Add to cart
            </Button>
          </Box>
          <Divider
            orientation="horizontal"
            variant="fullWidth"
            sx={{ bgcolor: "#999", height: "1px", mt: 3, mb: 3 }}
          />
        </Box>
      </div>
      <Divider
        orientation="horizontal"
        variant="fullWidth"
        sx={{ bgcolor: "#DCDCDC", height: "1px", mt: 3, mb: 3, mx: "120px" }}
      />
      {/* footer component */}
      <Footer />
    </>
  );
};

export default ProductDetail;
