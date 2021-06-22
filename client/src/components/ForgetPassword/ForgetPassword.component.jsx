import React from "react";

function ForgetPassword() {
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
        <h1 className="font-normal text-3xl mb-1">Password assistance</h1>
        <p className="mb-3 text-sm">
          Enter the email address associated with your Amazon account.
        </p>
        <form action="">
          <h5 className="font-semibold">Email</h5>
          <input type="email" name="" id="" className="form_inp" />

          <button className="w-full my-3 p-1 cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded-sm">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
