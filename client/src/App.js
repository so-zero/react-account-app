import "./App.css";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    navigate("user-profile");

    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <>
      <ToastContainer />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
