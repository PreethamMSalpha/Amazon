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
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/**right menus */}
        <div className="text-white flex items-center text-xs space-x-6 m-6 whitespace-nowrap">
          <div className="link">
            <p>Hello, Sign in</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div className="relative link flex items-center">
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
      </div>
    </div>
  );
}

export default Header;
