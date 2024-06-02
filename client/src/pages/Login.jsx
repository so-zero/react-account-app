import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

    try {
      const response = await axios.post(URL, data);

      toast.success(response.data.message);
      setLoading(false);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        setData({
          email: "",
          password: "",
        });
        navigate("/user-profile");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1 className="container-text">로그인</h1>
        <div className="form-icon">
          <div className="lock-icon">
            <FaLock size={40} />
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-list">
            <label htmlFor="email" />
            <div className="input-list">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="이메일"
                value={data.email}
                disabled={loading}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-list">
            <label htmlFor="password" />
            <div className="input-list">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="비밀번호"
                value={data.password}
                disabled={loading}
                onChange={handleChange}
              />
              <div
                className="password-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </div>
            </div>
          </div>

          <div className="btn-center">
            <p>
              계정이 없으신가요?
              <Link to="/register" className="link">
                회원가입
              </Link>
            </p>

            <button className="btn login-btn">
              {loading ? "로딩중" : "로그인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
