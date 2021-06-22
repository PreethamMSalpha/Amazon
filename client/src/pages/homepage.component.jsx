import React from "react";
import Banner from "../components/Banner/Banner.component";
import Footer from "../components/Footer/Footer.component";
import Header from "../components/Header/Header.component";
import ProductFeedHome from "../components/ProductFeedHome/ProductFeedHome.component";
//mx-auto object-contain grid align-middle justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52

function Homepage() {
  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="flex flex-wrap justify-center align-middle m-auto w-full md:-mt-52 sm:-mt-36">
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <div className="w-full my-4">
            <img
              src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
              alt=""
              className="mx-auto m-auto "
            />
          </div>
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <ProductFeedHome />
          <div className="w-full my-4">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Vernac13th/1500x150_V2_Eng._CB412582591_.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
