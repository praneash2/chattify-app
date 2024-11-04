"use client";
import React, { useState } from "react";

interface credentials {
  email: string;
  password: string;
}
interface signupProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  credentials: credentials;
  setCredentials: React.Dispatch<React.SetStateAction<credentials>>;
}

export default function Signup({
  setLogin,
  credentials,
  setCredentials,
}: signupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword,setConfirmPassword] = useState("");
  // Event handler for input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  console.log(confirmPassword);
  return (
    <div className="flex gap-3 flex-col justify-center items-center">
      <h6 className="">Signup</h6>
      <input
        className="h-[50px] w-[70%] rounded-md p-3"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
      />

      <div className="relative w-[70%]">
        <input
          className="h-[50px] w-full rounded-md p-3 pr-10" // Add padding-right for the button
          type={showPassword ? "text" : "password"} // Toggle type between 'text' and 'password'
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div className="relative w-[70%]">
        <input
          className="h-[50px] w-full rounded-md p-3 pr-10" // Add padding-right for the button
          type={showPassword ? "text" : "password"} // Toggle type between 'text' and 'password'
          name="confirmPassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
        />

        <button
          type="button"
          className="absolute inset-y-0 right-2 flex items-center text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button className="text-white bg-yellow-800 py-2 px-4 rounded-md">
        Submit
      </button>
      <p
        className="text-white hover:text-red-700 cursor-pointer"
        onClick={() => {
          setLogin(true);
        }}
      >
        Already have an account ?{" "}
      </p>
    </div>
  );
}
