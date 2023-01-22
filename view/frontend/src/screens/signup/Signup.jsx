// react
import React, { useRef, useState } from "react";

// react router
import { NavLink, useNavigate } from "react-router-dom";

// react icons
import { BsFillHandbagFill } from "react-icons/bs";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";

// third party libraries
import axios from "axios";
import { toast } from "react-toastify";

// Api Url
import Base_URI from "../../core";

// loader
import loader from "../../images/loader.gif";

// component
import { Toast } from "../../components";

// css
import style from "./signup.module.css";

const Signup = () => {
  const [eye, setEye] = useState(true);
  const inputType = useRef();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signupform = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${Base_URI}signup`, credentials);
      setLoading(false);

      if (response.data.message === "success") {
        toast.success("Signup Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (response.data.message === "Already a User") {
        toast.error("Already a user");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Please try again");
    }

    setCredentials({
      name: "",
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
            <h1>Create Account</h1>
            <form onSubmit={(e) => signupform(e)}>
              <input
                type="text"
                placeholder="Username"
                required
                name="name"
                value={credentials.name}
                className={style.credentialField}
                onChange={(e) =>
                  setCredentials({ ...credentials, name: e.target.value })
                }
              />
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
              <input type="submit" className={style.btn} value="Sign Up" />
            </form>
            <div className={style.linkDiv}>
              already have an account?
              <NavLink to="/login" className={style.link}>
                Login here.
              </NavLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Signup;
