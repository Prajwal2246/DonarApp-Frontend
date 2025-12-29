import axios from "axios";
import React from "react";

function DonarCard({ donor }) {
  const handleRequest = async (id) => {
    try {
      const baseurl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${baseurl}/request/send`,
        { donorId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Request sent succesfully");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending request");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300" style={{ padding: "16px", margin: "8px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h3 className="text-xl font-bold text-gray-900">{donor.name}</h3>
        <p className="text-gray-700" style={{ marginTop: "6px" }}>
          Blood Type: <span className="font-semibold text-red-600">{donor.bloodType}</span>
        </p>
        <p className="text-gray-700" style={{ marginTop: "4px" }}>
          Address: <span className="font-medium text-gray-800">{donor.manualLocation}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
          onClick={() => handleRequest(donor._id)}
          style={{ padding: 8, margin: 10 }}
        >
          Request
        </button>
      </div>
    </div>
  );
}

export default DonarCard;
