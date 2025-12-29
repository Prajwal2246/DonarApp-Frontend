import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const baseurl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${baseurl}/auth/login`, {
        email,
        password,
      });
      setMsg("Login successful");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 404) {
        setMsg("User not found. Please register first");
        setTimeout(() => {
          navigate("/register");
        }, 1000);
      } else if (error.response?.status === 401) {
        setMsg("Incorrect password");
      } else {
        setMsg("Something went wrong");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      style={{ padding: "20px" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ marginBottom: "12px" }}>
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">Please login to your account</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white shadow-2xl rounded-2xl backdrop-blur-sm border border-gray-100"
          style={{ padding: "40px" }}
        >
          <div style={{ marginBottom: "24px" }}>
            <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              style={{ padding: "12px 16px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label className="block text-sm font-semibold text-gray-700" style={{ marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              style={{ padding: "12px 16px" }}
              required
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ padding: "14px" }}
            type="submit"
          >
            Login
          </button>

          <div className="text-center" style={{ marginTop: "24px" }}>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </form>

        {msg && (
          <div
            className={`text-center rounded-lg shadow-md ${
              msg === "Login successful"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
            style={{ padding: "16px", marginTop: "24px" }}
          >
            <p
              className={`font-medium ${
                msg === "Login successful" ? "text-green-700" : "text-red-600"
              }`}
            >
              {msg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;