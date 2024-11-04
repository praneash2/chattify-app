"use client"
import React, { useState } from 'react';

interface Credentials {
  email: string;
  password: string;
}

interface LoginProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  credentials: Credentials;
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>;
}

export default function Login({ setLogin, credentials, setCredentials }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Event handler for input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="flex gap-3 flex-col justify-center items-center">
      <h6 className="">Login</h6>

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
          type={showPassword ? "text" : "password"}         // Toggle type between 'text' and 'password'
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

      <button className="text-white bg-yellow-800 py-2 px-4 rounded-md">Submit</button>
      
      <p
        className="text-white hover:text-red-700 cursor-pointer"
        onClick={() => {
          setLogin(false);
        }}
      >
        Create new account?
      </p>
    </div>
  );
}
