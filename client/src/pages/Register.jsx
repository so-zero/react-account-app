import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FileUpload } from "../components/FileUpload ";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const fileUpload = await FileUpload(file);

    setData({ ...data, avatar: fileUpload });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);

      toast.success(response.data.message);
      setLoading(false);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          avatar: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="form-avatar">
          {data.avatar ? (
            <img src={data?.avatar} alt="Avatar" className="avatar" />
          ) : (
            <div className="lock-icon">
              <FaLock size={40} />
              <form>
                <label htmlFor="file">
                  <div className="upload-avatar">이미지 업로드</div>
                  <input type="file" id="file" onChange={handleUpload} />
                </label>
              </form>
            </div>
          )}
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-list">
            <label htmlFor="name" />
            <div className="input-list">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="이름"
                value={data.name}
                disabled={loading}
                onChange={handleChange}
              />
            </div>
          </div>

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

          <div className="form-list">
            <label htmlFor="confirmPassword" />
            <div className="input-list">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={data.confirmPassword}
                disabled={loading}
                onChange={handleChange}
              />
              <div
                className="password-icon"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <FaEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </div>
            </div>
          </div>

          <div className="btn-center">
            <p>
              계정이 있으신가요?
              <Link to="/login" className="link">
                로그인
              </Link>
            </p>

            <button className="btn login-btn">
              {loading ? "로딩중" : "회원가입"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
