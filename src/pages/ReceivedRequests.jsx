import React, { useEffect, useState } from "react";
import axios from "axios";

function ReceivedRequests() {
  const [receivedRequests, setReceivedRequests] = useState([]);

  const handleAccept = async (id) => {
    try {
      const baseuri = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      await axios.put(
        `${baseuri}/request/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReceivedRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, Status: "accepted" } : req
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const baseuri = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("token");

      await axios.put(
        `${baseuri}/request/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReceivedRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, Status: "rejected" } : req
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const baseuri = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${baseuri}/request/received`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setReceivedRequests(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ padding: 24 }}>
      <h1 className="text-3xl font-bold text-gray-900" style={{ marginBottom: 24 }}>
        Received Requests
      </h1>

      {receivedRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 text-center text-gray-600" style={{ padding: 32 }}>
          <p className="text-lg">📬 No received requests yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {receivedRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-lg hover:shadow-xl rounded-xl border border-gray-200 transition-all duration-300"
              style={{ padding: 20 }}
            >
              <div style={{ marginBottom: 16 }}>
                <p className="text-gray-700" style={{ marginBottom: 8 }}>
                  <strong className="text-gray-900 font-semibold">Requester:</strong>{" "}
                  <span className="text-gray-800 font-medium">{req.requesterId.name}</span>
                </p>
                <p className="text-gray-700" style={{ marginBottom: 8 }}>
                  <strong className="text-gray-900 font-semibold">Email:</strong>{" "}
                  <span className="text-gray-800">{req.requesterId.email}</span>
                </p>
                <p className="text-gray-700" style={{ marginBottom: 8 }}>
                  <strong className="text-gray-900 font-semibold">Phone:</strong>{" "}
                  <span className="text-gray-800">{req.requesterId.phoneNumber}</span>
                </p>
                <p className="text-gray-700" style={{ marginBottom: 8 }}>
                  <strong className="text-gray-900 font-semibold">Location:</strong>{" "}
                  <span className="text-gray-800">{req.manualLocation}</span>
                </p>
                
                {/* Status Badge */}
                <div style={{ marginTop: 8 }}>
                  <span
                    className={`inline-block px-3 py-1.5 text-xs font-bold rounded-full uppercase tracking-wide
                      ${
                        req.Status?.toLowerCase() === "accepted"
                          ? "bg-green-100 text-green-700 border border-green-300"
                          : req.Status?.toLowerCase() === "rejected"
                          ? "bg-red-100 text-red-700 border border-red-300"
                          : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                  >
                    Status: {req.Status}
                  </span>
                </div>
              </div>

              {/* Accept/Reject Buttons */}
              <div className="flex gap-3" style={{ marginTop: 16 }}>
                <button
                  className="flex-1 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 active:bg-green-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ padding: 10 }}
                  onClick={() => handleAccept(req._id)}
                  disabled={req.Status !== "pending"}
                >
                  ✓ Accept
                </button>
                <button
                  className="flex-1 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 active:bg-red-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ padding: 10 }}
                  onClick={() => handleReject(req._id)}
                  disabled={req.Status !== "pending"}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReceivedRequests;
