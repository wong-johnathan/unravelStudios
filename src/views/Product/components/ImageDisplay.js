import React from "react";
import image from "assets/318x180.svg";
import "./imageDisplay.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageDisplay = ({ images = [] }) => {
  console.log(images);
  return (
    <div className='d-flex justify-content-center align-items-center border imageDisplay'>
      {images.length > 0 ? (
        <Carousel>
          {images.map((image, index) => (
            <img key={index} src={image.url} width='100%' alt='Product' />
          ))}
        </Carousel>
      ) : (
        <img src={image} width='100%' alt='Product' />
      )}
    </div>
  );
};

export default ImageDisplay;
