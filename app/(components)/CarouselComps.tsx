"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComp() {
  return (
    <>
      <div className="mx-auto max-w-[1200px]">
        <Carousel
          showArrows={false}
          autoPlay={true}
          interval={2000}
          infiniteLoop={true}
          showThumbs={false}
        >
          <div>
            <img src="/images/banner/1.png" alt="banner" />
          </div>
          <div>
            <img src="/images/banner/2.png" alt="banner" />
          </div>
          <div>
            <img src="/images/banner/3.png" alt="banner" />
          </div>
        </Carousel>
      </div>
    </>
  );
}
