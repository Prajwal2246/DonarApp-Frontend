import React, { useEffect, useState } from "react";
import axios from "axios";

function MyRequests() {
  const [requests, setRequests] = useState([]);

  const handleDelete = async (id) => {
    try {
      const baseurl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      await axios.delete(`${baseurl}/request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const baseurl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${baseurl}/request`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res.data);
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ padding: 24 }}>
      <h1 className="text-3xl font-bold text-gray-900" style={{ marginBottom: 24 }}>
        Your Requests
      </h1>
      {requests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 text-center text-gray-600" style={{ padding: 32 }}>
          <p className="text-lg">📭 You haven't made any requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req._id}
              className="relative bg-white shadow-lg hover:shadow-xl rounded-xl border border-gray-200 transition-all duration-300"
              style={{ padding: 20 }}
            >
              {/* Status Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1.5 text-xs font-bold rounded-full uppercase tracking-wide
    ${
      req.Status?.toLowerCase() === "accepted"
        ? "bg-green-500 text-white"
        : req.Status?.toLowerCase() === "rejected"
        ? "bg-red-500 text-white"
        : "bg-yellow-500 text-white"
    }`}
              >
                {req.Status?.toUpperCase()}
              </span>

              <div style={{ marginBottom: 12 }}>
                <p className="text-gray-700" style={{ marginBottom: 6 }}>
                  <strong className="text-gray-900 font-semibold">Requested to:</strong>{" "}
                  <span className="text-gray-800">{req.donorId.name}</span>
                </p>
                <p className="text-gray-700" style={{ marginBottom: 6 }}>
                  <strong className="text-gray-900 font-semibold">Email:</strong>{" "}
                  <span className="text-gray-800">{req.donorId.email}</span>
                </p>
                <p className="text-gray-700">
                  <strong className="text-gray-900 font-semibold">Address:</strong>{" "}
                  <span className="text-gray-800">{req.donorId.manualLocation}</span>
                </p>
              </div>

              {/* Phone Number Logic */}
              {req.Status === "accepted" ? (
                <div
                  className="border-2 border-green-400 bg-green-50 rounded-lg"
                  style={{ padding: 16, marginTop: 12 }}
                >
                  <p className="text-green-700 font-semibold" style={{ marginBottom: 6 }}>
                    ✔ Your request was accepted!
                  </p>
                  <p className="text-lg font-bold text-green-900">
                    📞 Contact Number: {req.donorId.phoneNumber}
                  </p>
                </div>
              ) : (
                <div
                  className="border-2 border-gray-300 bg-gray-50 rounded-lg text-gray-600"
                  style={{ padding: 16, marginTop: 12 }}
                >
                  <p className="font-medium">
                    🔒 Phone number is hidden until your request is accepted.
                  </p>
                </div>
              )}

              <button
                className="bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 active:bg-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                style={{ padding: 10, marginTop: 16 }}
                onClick={() => handleDelete(req._id)}
              >
                Delete Request
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRequests;
