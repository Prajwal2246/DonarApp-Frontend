import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Need to login to enable the features");
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
