import React from "react";
import "./Header.scss";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

function Header() {
  return (
    <div>
      {/*top nav */}
      <div className="flex items-center bg-amazon_blue  flex-grow h-16">
        <div className="mt-2 ml-6 flex items-center flex-grow sm:flex-grow-0">
          <img
            src="https://i.ibb.co/rfvRW5q/amazon-logo.png"
            alt="logo"
            width={100}
            height={40}
            className="cursor-pointer object-contain"
          />
        </div>

        {/** search bar */}
        <div className="ml-6 hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <select class="hidden  w-1/6 text-sm object-contain p-2 h-full bg-gray-100 flex-shrink focus:outline-none rounded-l-md">
            <option value="0">All Categories</option>
            <option value="1">Deals</option>
            <option value="2">Alexa Skills</option>
            <option value="3">Amazon Devices</option>
            <option value="4">Amazon Fashion</option>
            <option value="5">Amazon Pantry</option>
            <option value="6">Appliances</option>
            <option value="7">Apps &amp; Games</option>
            <option value="8">Baby</option>
            <option value="9">Beauty</option>
            <option value="10">Big Bazaar</option>
            <option value="11">Books</option>
            <option value="12">Car &amp; Motorbike</option>
            <option value="13">Clothing &amp; Accessories</option>
            <option value="14">Collectibles</option>
            <option value="15">Computers &amp; Accessories</option>
            <option value="16">Electronics</option>
            <option value="17">Furniture</option>
            <option value="18">Garden &amp; Outdoors</option>
            <option value="19">Gift Cards</option>
            <option value="20">Grocery &amp; Gourmet Foods</option>
            <option value="21">Health &amp; Personal Care</option>
            <option value="22">Home &amp; Kitchen</option>
            <option value="23">Industrial &amp; Scientific</option>
            <option value="24">Jewellery</option>
            <option value="25">Kindle Store</option>
            <option value="26">Luggage &amp; Bags</option>
            <option value="27">Luxury Beauty</option>
            <option value="28">Movies &amp; TV Shows</option>
            <option value="29">Music</option>
            <option value="30">Musical Instruments</option>
            <option value="31">Office Products</option>
            <option value="32">Pet Supplies</option>
            <option value="33">Prime Video</option>
            <option value="34">Shoes &amp; Handbags</option>
            <option value="35">Software</option>
            <option value="36">Sports, Fitness &amp; Outdoors</option>
            <option value="37">Tools &amp; Home Improvement</option>
            <option value="38">Toys &amp; Games</option>
            <option value="39">Under ₹500</option>
            <option value="40">Video Games</option>
            <option value="41">Watches</option>
          </select>
          <input
            className="rounded-l-md p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/**right menus */}
        <div className="text-white flex items-center text-xs space-x-6 m-6 whitespace-nowrap">
          <div className="def_hover">
            <p>Hello, Sign in</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="def_hover">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="relative def_hover flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Cart
            </p>
          </div>
        </div>
      </div>

      {/*bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1 " />
          All
        </p>
        <p className="link">Best Sellers</p>
        <p className="link hidden md:inline-flex">Mobiles</p>
        <p className="link hidden md:inline-flex">Fashion</p>
        <p className="link hidden md:inline-flex">Electronics</p>
        <p className="link">Prime</p>
        <p className="link">New Releases</p>
        <p className="link">Customer Service</p>
        <p className="link">Amazon Pay</p>
      </div>
    </div>
  );
}

export default Header;
