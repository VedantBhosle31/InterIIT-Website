import React, { useState, useEffect } from "react";
import Image1 from "@/assets/iitm_logo.png";
import Image2 from "@/assets/logo_dark.svg";

const images = [Image1, Image2]; // Import your SVG images
const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-48">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={`Image ${index + 1}`}
          className={`absolute w-full h-full ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000`}
        />
      ))}
    </div>
  );
};

export default ImageSlider