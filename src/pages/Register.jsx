import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Registration form
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${apiUrl}/auth/register`, form);
      alert(res.data.message);
      setForm({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 via-pink-50 to-red-50"
      style={{ padding: "20px" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <h2
            className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            style={{ marginBottom: "12px" }}
          >
            Join Us Today
          </h2>
          <p className="text-gray-600 text-sm">Create your account to get started</p>
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-white rounded-2xl shadow-2xl backdrop-blur-sm border border-gray-100"
          style={{ padding: "40px" }}
        >
          {error && (
            <div
              className="bg-red-50 border border-red-200 rounded-lg text-center"
              style={{ padding: "12px", marginBottom: "24px" }}
            >
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          <div style={{ marginBottom: "20px" }}>
            <label
              className="block text-sm font-semibold text-gray-700"
              style={{ marginBottom: "8px" }}
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              style={{ padding: "12px 16px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              className="block text-sm font-semibold text-gray-700"
              style={{ marginBottom: "8px" }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              style={{ padding: "12px 16px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              className="block text-sm font-semibold text-gray-700"
              style={{ marginBottom: "8px" }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              style={{ padding: "12px 16px" }}
              required
            />
          </div>

          <div style={{ marginBottom: "28px" }}>
            <label
              className="block text-sm font-semibold text-gray-700"
              style={{ marginBottom: "8px" }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter 10 digit phone number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]{10}"
              className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 outline-none bg-gray-50 hover:bg-white"
              style={{ padding: "12px 16px" }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ padding: "14px", marginBottom: "12px" }}
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ padding: "14px" }}
          >
            Already have an account? Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-500" style={{ marginTop: "24px", padding: "0 20px" }}>
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Register;