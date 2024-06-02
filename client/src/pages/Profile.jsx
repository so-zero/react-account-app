import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";

export default function Profile() {
  const [data, setData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const handleUserProfile = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-profile`;

    try {
      const response = await axios.post(URL, data, {
        headers: { authorization: localStorage.getItem("token") },
      });

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="profile">
      <div className="user-profile">
        <button className="logout" onClick={handleLogout}>
          로그아웃
        </button>
        {data?.avatar ? (
          <img src={data?.avatar} alt={data?.name} className="user-avatar" />
        ) : (
          <div className="user-icon">
            <FaUser size={50} />
          </div>
        )}

        <h1 className="user-name">{data?.name}</h1>
        <p className="user-email">{data?.email}</p>
      </div>
    </div>
  );
}
