import React from "react";

function SignIn() {
  return (
    <div className="m-auto flex flex-col align-middle">
      <div className="m-auto mt-5 mb-5 object-cover justify-center">
        <img
          src="https://i.ibb.co/Z6GzWmS/amazon-signup.png"
          alt="amazon logo"
          width="150px"
        />
      </div>
      <div className="w-96 m-auto object-contain flex flex-col rounded-lg shadow-md border border-solid border-gray-300 p-4">
        <h1 className="font-normal text-3xl mb-4">Sign-In</h1>
        <form action="">
          <h5 className="font-semibold">E-mail</h5>
          <input type="text" name="" id="" className="form_inp" />
          <div className="mt-3 flex flex-row justify-between">
            <h5 className=" font-semibold">Password</h5>
            <h5 className="text-blue-500 cursor-pointer hover:underline">
              Forgot your password
            </h5>
          </div>
          <input type="password" name="" id="" className="form_inp" />
          <button className="mt-4 w-full p-1 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-sm">
            Sign-In
          </button>
        </form>

        <p className="mt-4 text-sm object-contain">
          By continuing you agree to Amazon's&nbsp;
          <a href="#" className="text-blue-500 hover:underline">
            Conditions of Use
          </a>
          &nbsp;and&nbsp;
          <a href="#" className="text-blue-500 hover:underline">
            Privacy Notice
          </a>
        </p>
        <div className="my-4 border border-solid border-gray-300" />
        <h6 className="m-auto text-xs text-gray-500 mb-3">New to Amazon?</h6>
        <button className="bg-gray-300 p-1 hover:bg-gray-400 mb-3 rounded-sm">
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}

export default SignIn;
