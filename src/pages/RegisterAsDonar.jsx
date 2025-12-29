import axios from "axios";
import React, { useState } from "react";

function registerAsDonar() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    bloodType: "",
    latitude: null,
    longitude: null,
    manualLocation: "",
  });

  const [locationError, setLocationError] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setLocationError("");
        },
        (error) => {
          setLocationError("location acces denied,please enter manually");
        }
      );
    } else {
      setLocationError("geolocation is not supported by your browser");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donorData = {
      name: form.name,
      email: form.email,
      phoneNumber: form.phoneNumber,
      bloodType: form.bloodType,
      latitude: form.latitude,
      longitude: form.longitude,
      manualLocation: form.manualLocation,
    };

    try {
      const baseuri = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseuri}/donors/registeredDonors`,
        donorData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSubmitStatus("Registered successfully!");

      // Reset form
      setForm({
        name: "",
        email: "",
        phoneNumber: "",
        bloodType: "",
        latitude: null,
        longitude: null,
        manualLocation: "",
      });
    } catch (error) {
      console.error(error);
      setSubmitStatus("Error registering donor", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-pink-100"
      style={{ padding: 4 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100"
        style={{ padding: 24 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900" style={{ marginBottom: 16 }}>
          Register as Donor
        </h2>

        {locationError && (
          <p className="text-red-600 text-center text-sm font-medium" style={{ padding: 8, marginBottom: 8 }}>
            {locationError}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="h-11 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
          style={{ marginBottom: 14, paddingLeft: 12, paddingRight: 12 }}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="h-11 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
          style={{ marginBottom: 14, paddingLeft: 12, paddingRight: 12 }}
          required
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="h-11 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
          style={{ marginBottom: 14, paddingLeft: 12, paddingRight: 12 }}
          required
        />

        <input
          type="text"
          name="bloodType"
          placeholder="Blood Type (e.g., A+, O-, B+)"
          value={form.bloodType}
          onChange={handleChange}
          className="h-11 w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
          style={{ marginBottom: 14, paddingLeft: 12, paddingRight: 12 }}
          required
        />

        {/* Location Section */}
        {!form.latitude && !form.longitude && (
          <div className="bg-gray-50 rounded-lg border border-gray-200" style={{ padding: 16, marginBottom: 14 }}>
            <p className="text-sm text-gray-700 font-medium" style={{ marginBottom: 12 }}>
              📍 We need your location to show you nearby blood donors
            </p>
            <button
              type="button"
              onClick={getLocation}
              className="w-full bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 active:bg-red-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              style={{ padding: 10, marginBottom: 12 }}
            >
              Share My Location
            </button>
            <p className="text-gray-600 text-center text-sm font-medium" style={{ marginBottom: 8 }}>
              Or enter your city/address manually
            </p>
            <input
              type="text"
              name="manualLocation"
              placeholder="City or Address"
              value={form.manualLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:outline-none transition-all"
              style={{ padding: 10 }}
            />
          </div>
        )}

        {/* Location Status */}
        {form.latitude && form.longitude && (
          <p className="text-green-600 font-semibold text-sm bg-green-50 rounded-lg border border-green-200" style={{ padding: 10, marginBottom: 14 }}>
            ✅ Location detected successfully
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-red-600 font-semibold text-white text-lg rounded-lg hover:bg-red-700 active:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          style={{ padding: 12, marginTop: 8 }}
          disabled={!(form.latitude || form.manualLocation)}
        >
          Register as Donor
        </button>

        {submitStatus && (
          <p className="text-center text-gray-800 font-medium bg-gray-100 rounded-lg" style={{ padding: 12, marginTop: 16 }}>
            {submitStatus}
          </p>
        )}
      </form>
    </div>
  );
}

export default registerAsDonar;
