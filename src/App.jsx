import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import RegisterAsDonar from "./pages/RegisterAsDonar";
import Donorlist from "./pages/Donorlist";
import MyRequests from "./pages/MyRequests";
import ReceivedRequests from "./pages/ReceivedRequests";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register-as-donar" element={<RegisterAsDonar />} />
        <Route path="/donors" element={<Donorlist />} />
        <Route path="/requests" element={<MyRequests />} />
        <Route path="/receivedRequest" element={<ReceivedRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
