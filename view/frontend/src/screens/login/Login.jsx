// react
import React, { useRef, useState } from "react";

// react router
import { NavLink, useNavigate } from "react-router-dom";

// react icons
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { BsFillHandbagFill } from "react-icons/bs";

// third party
import axios from "axios";
import { toast } from "react-toastify";

// Api Url
import Base_URI from "../../core";

// component
import { Toast } from "../../components";

// loader
import loader from "../../images/loader.gif";

// css
import style from "./login.module.css";

const Login = () => {
  const [eye, setEye] = useState(true);
  const inputType = useRef();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginform = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${Base_URI}login`, credentials);
      setLoading(false);

      if (response.data.message === "success") {
        toast.success("Login Successfully");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else if (response.data.message === "Invalid Credentials") {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Please try again");
    }

    setCredentials({
      email: "",
      password: "",
    });
  };

  return (
    <div className={style.mainDiv}>
      <Toast />

      {/* logo */}
      <div className={style.logo} onClick={() => navigate("/")}>
        <BsFillHandbagFill className={style.bagIcon} />
        <h1>UNIVERSAL SHOP</h1>
      </div>

      <section className={style.container}>
        {loading ? (
          <img
            src={loader}
            alt="loader"
            width="130px"
            style={{ marginTop: "180px" }}
          />
        ) : (
          <div className={style.subContainer}>
            <h1>Login</h1>
            <form onSubmit={(e) => loginform(e)}>
              <input
                type="email"
                placeholder="Email Address"
                required
                name="email"
                value={credentials.email}
                className={style.credentialField}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  pattern=".{8,}"
                  value={credentials.password}
                  ref={inputType}
                  className={style.credentialField}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                  }}
                />
                <span
                  onClick={() => {
                    setEye(!eye);
                    inputType.current.type === "text"
                      ? (inputType.current.type = "password")
                      : (inputType.current.type = "text");
                  }}
                >
                  {eye === true ? (
                    <IoEyeSharp className={style.icon} />
                  ) : (
                    <IoEyeOffSharp className={style.icon} />
                  )}
                </span>
              </div>
              <input type="submit" className={style.btn} value="Login" />
            </form>
            <div className={style.linkDiv}>
              Don't have an account?
              <NavLink to="/signup" className={style.link}>
                Signup here.
              </NavLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Login;
