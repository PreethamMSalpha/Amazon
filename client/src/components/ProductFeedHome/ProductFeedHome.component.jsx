import React from "react";
// grid grid-cols-2 gap-2
// grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
function ProductFeedHome() {
  return (
    <div className="w-72 shadow-lg bg-white p-5 z-30 m-3.5">
      <h1 className="text-xl font-medium">Shop by category</h1>
      <div className="grid grid-cols-2 gap-2 ">
        <div className="small_div cursor-pointer">
          <div className="">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Mobile._SY116_CB431401553_.jpg"
              alt=""
            />
          </div>
          <div>
            <p>Fresh</p>
          </div>
        </div>
        <div className="small_div cursor-pointer">
          <div className="">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Fresh._SY116_CB431401553_.jpg"
              alt=""
            />
          </div>
          <div>
            <p>Mobile</p>
          </div>
        </div>
        <div className="small_div cursor-pointer">
          <div className="">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Fashion._SY116_CB431401553_.jpg"
              alt=""
            />
          </div>
          <div>
            <p>Fashion</p>
          </div>
        </div>
        <div className="small_div cursor-pointer">
          <div className="">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/2020/PC/Electronic._SY116_CB431401553_.jpg"
              alt=""
            />
          </div>
          <div>
            <p>Electronics</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <a href="#" className="text-blue-500 hover:underline">
          Show more
        </a>
      </div>
    </div>
  );
}

export default ProductFeedHome;
