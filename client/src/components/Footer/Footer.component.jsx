import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" bg-amazon_blue-light">
      <div className="m-auto flex flex-row text-white p-6 pt-10 pb-10 justify-around w-4/5">
        <div className="flex flex-col">
          <p className="font-bold">Get to know us</p>
          <p className="link">About us</p>
          <p className="link">Carrers</p>
          <p className="link">Press Releases</p>
          <p className="link">Amazon cares</p>
          <p className="link">Gift a smile</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Connect with Us</p>
          <p className="link">Facebook</p>
          <p className="link">Twitter</p>
          <p className="link">Instagram</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Make Money with Us</p>
          <p className="link">Sell on Amazon</p>
          <p className="link">Sell under Amazon Accelerator</p>
          <p className="link">Amazon Global Selling</p>
          <p className="link">Become an Affiliate</p>
          <p className="link">Fulfilment by Amazon</p>
          <p className="link">Advertise Your Products</p>
          <p className="link">Amazon Pay on Merchants</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Let Us Help You</p>
          <p className="link">COVID-19 and Amazon</p>
          <p className="link">Your Account</p>
          <p className="link">Returns Centre</p>
          <p className="link">100% Purchase Protection</p>
          <p className="link">Amazon App Download</p>
          <p className="link">Amazon Assistant Download</p>
          <p className="link">Help</p>
        </div>
      </div>
      <div className="border border-solid border-gray-600"></div>
      <div className="flex flex-col bg-amazon_blue">
        <div className="m-6">
          <Link to="/">
            <img
              src="https://i.ibb.co/rfvRW5q/amazon-logo.png"
              alt="logo"
              width={100}
              height={40}
              className="cursor-pointer object-contain m-auto"
            />
          </Link>
          <div className="text-white flex text-xs m-auto mt-6 justify-center text-center">
            <p className="link mx-2">Conditions of Use & Sale</p>
            <p className="link mx-2">Privacy Notice</p>
            <p className="link mx-2">Interest-Based Ads</p>
            <span className="mx-2">
              © 1996-2021, Amazon.com, Inc. or its affiliates
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
