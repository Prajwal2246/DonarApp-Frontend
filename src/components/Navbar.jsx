import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // redirect to login page
  };

  return (
    <nav
      className="w-full bg-white shadow-lg border-b border-gray-100 flex items-center justify-between backdrop-blur-sm"
      style={{ padding: "16px 32px" }}
    >
      {/* Left - Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
      >
        <div
          className="bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-md flex items-center justify-center overflow-hidden"
          style={{ padding: "8px", width: "48px", height: "48px" }}
        >
          <img
            src="/public/logo.jpg"
            alt="App Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          LifeLink
        </span>
      </Link>

      {/* Right - Buttons */}
      <div className="flex items-center" style={{ gap: "16px" }}>
        {!token ? (
          <>
            <button
              onClick={() => navigate("/register")}
              className="text-gray-700 font-semibold hover:text-red-600 transition-colors duration-200"
              style={{ padding: "10px 20px" }}
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              style={{ padding: "10px 24px" }}
            >
              Login
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-lg hover:from-gray-800 hover:to-black transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            style={{ padding: "10px 24px" }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;