import { useEffect, useState } from "react";
import axios from "axios";
import DonarCard from "../components/DonarCard";

function Donorlist() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

 const handleShowNearbyDonors = () => {
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const baseurl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");
        const loggedInUserId = localStorage.getItem("userId");

        const res = await axios.get(
          `${baseurl}/donors/nearby?lat=${latitude}&lng=${longitude}&distance=5000`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Ensure you compare with the correct field (_id or userId)
        const filtered = res.data.filter((d) => d._id !== loggedInUserId);

        if (filtered.length === 0) {
          alert("No donors found within 5 km.");
        }

        setDonors(filtered);
      } catch (error) {
        console.error("Error finding nearby donors:", error);
        alert("Something went wrong while fetching nearby donors.");
      } finally {
        setLoading(false);
      }
    },
    (error) => {
      setLoading(false);
      alert("Unable to get your location. Please enable location services.");
      console.error(error);
    }
  );
};


  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const baseurl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseurl}/donors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDonors(res.data);
      } catch (error) {
        console.error("error fetching error", error);
      }
    };
    fetchDonors();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50"
      style={{ padding: "32px 24px" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
            style={{ marginBottom: "16px" }}
          >
            Available Donors
          </h1>
          <p className="text-gray-600 text-lg" style={{ marginBottom: "24px" }}>
            Find blood donors near you and send requests
          </p>

          {/* Nearby Donors Button */}
          <button
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
            style={{ padding: "14px 32px", gap: "8px" }}
            onClick={handleShowNearbyDonors}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Finding nearby donors...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Show Donors Within 5km
              </>
            )}
          </button>
        </div>

        {/* Donors Count */}
        {donors.length > 0 && (
          <div
            className="bg-white rounded-xl shadow-md border border-gray-100 text-center"
            style={{ padding: "16px", marginBottom: "32px" }}
          >
            <p className="text-gray-700 font-medium">
              <span className="text-2xl font-bold text-red-600">
                {donors.length}
              </span>{" "}
              {donors.length === 1 ? "donor" : "donors"} available
            </p>
          </div>
        )}

        {/* Donors Grid */}
        {donors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {donors.map((donor) => (
              <DonarCard key={donor._id} donor={donor} />
            ))}
          </div>
        ) : (
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 text-center"
            style={{ padding: "64px 32px" }}
          >
            <div
              className="bg-red-100 rounded-full inline-flex items-center justify-center"
              style={{ width: "80px", height: "80px", marginBottom: "24px" }}
            >
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800" style={{ marginBottom: "12px" }}>
              No Donors Found
            </h3>
            <p className="text-gray-600">
              Try searching for donors within 5km using the button above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donorlist;