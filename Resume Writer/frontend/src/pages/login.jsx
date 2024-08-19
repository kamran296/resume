import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate("/resume-list");
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" ">
        <form
          onSubmit={handleSubmit}
          className="h-[350px] w-[400px]  border-2 border-gray-500 rounded-lg flex flex-col items-center justify-center"
        >
          <div>
            <label htmlFor="email" className="text-lg mr-10">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="m-2  rounded-lg text-lg  border-2 border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg mr-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="m-2  rounded-lg text-lg border-2 border-gray-600"
            />
          </div>

          <button
            type="submit"
            className="h-8 w-24 bg-black text-white rounded-lg border-2 border-r-gray-600 mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
