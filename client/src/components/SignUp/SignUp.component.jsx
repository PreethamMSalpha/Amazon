import React from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";

function SignUp() {
  return (
    <div className="m-auto flex flex-col align-middle mb-6">
      <div className="m-auto mt-5 mb-5 object-cover justify-center">
        <img
          src="https://i.ibb.co/Z6GzWmS/amazon-signup.png"
          alt="amazon logo"
          width="150px"
        />
      </div>
      <div className="w-96 m-auto object-contain flex flex-col rounded-lg shadow-md border border-solid border-gray-300 p-4">
        <h1 className="font-normal text-3xl mb-4">Create Account</h1>
        <form action="">
          <h5 className="font-semibold">Your name</h5>
          <input type="text" name="" id="" className="form_inp" />
          <h5 className="font-semibold">Mobile number</h5>
          <input type="number" name="" id="" className="form_inp" />
          <h5 className="font-semibold">Email</h5>
          <input type="email" name="" id="" className="form_inp" />
          <h5 className=" font-semibold">Password</h5>
          <input type="password" name="" id="" className="form_inp" />
          <div className="flex flex-row items-center ">
            <InformationCircleIcon height="18px" className="mr-1" />
            <p className="text-sm">Passwords must be atleast 5 characters</p>
          </div>
          <p className="my-4 font-medium">
            We will send you a mail to verify your given email.
          </p>
          <button className="w-full p-1 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-sm">
            Continue
          </button>
        </form>

        <div className="mt-4 mb-3 border border-solid border-gray-300" />
        <div>
          <h6 className="m-auto text-sm text-gray-500 flex justify-start">
            Already have an account?&nbsp;
            <a className="text-blue-500 hover:underline">Sign in</a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
