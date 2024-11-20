import React from "react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";

function SlideShow() {
  const images = Array.from(
    { length: 8 },
    (_, index) => `/landing/screens/${index + 1}.png`
  );
  return (
    <Carousel
      className={`rounded-3xl w-full`}
      transition={{ duration: 2 }}
      autoplay
      loop
      autoplayDelay={5000}
      prevArrow={() => {}}
      nextArrow={() => {}}
      navigation={() => {}}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image ${index + 1}`}
          className="h-full w-full object-cover"
        />
      ))}
    </Carousel>
  );
}

function MobileContainer() {
  return (
    <div className={`relative w-[16rem] sm:w-[18rem] md:w-[20rem] lg:w-[22rem]`}>
      <div className="w-[75%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <SlideShow />
      </div>

      <Image
        alt="iPhone-12"
        src="/landing/iPhone-12-Mockup.png"
        className={`w-full`}
        width={320}
        height={30}
      />
    </div>
  );
}

export default MobileContainer;
