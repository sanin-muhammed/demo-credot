import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      indicators={false}
      prevIcon={
        <ArrowBackIosNewIcon
          style={{
            width: "40px",
            height: "40px",
            fontSize: "24px",
            color: "#fff",
            background: "#55606a",
            padding: "10px",
            borderRadius: "50%",
          }}
        />
      }
      nextIcon={
        <ArrowForwardIosIcon
          style={{
            width: "40px",
            height: "40px",
            fontSize: "24px",
            color: "#fff",
            background: "#55606a",
            padding: "10px",
            borderRadius: "50%",
          }}
        />
      }
    >
      <Carousel.Item>
        <img
          src="../sliderImg.svg"
          style={{
            width: "100%",
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="../sliderImg.svg"
          style={{
            width: "100%",
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="../sliderImg.svg"
          style={{
            width: "100%",
          }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
