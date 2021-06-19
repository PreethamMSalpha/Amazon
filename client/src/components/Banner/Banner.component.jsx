import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Banner() {
  return (
    <div className="relative">
    <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/shoes/June/wrs/gw/REVISED/pc/WRS-PC-1500x600-eng._CB666459563_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img2020/img21/apparelGW/WRS_JUNE/ATF/updated/PC/WRS-PC-1500x600-WA._CB666799972_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Fashion/Event/Gateway/WRS-Jun/V2-2People/8-fst-1500._CB666815613_.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/PC/Mayactivation/Accessoriesday1/D23140543_IN_CEPC_Electronicsaccessories_underRs999_3000x12000.5x._CB669031984_.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
