// react
import React, { useEffect, useState } from "react";

// react router
import { NavLink, useNavigate } from "react-router-dom";

// react icons
import { BsFillHandbagFill } from "react-icons/bs";
import { RiShoppingCartLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

// css
import style from "./component.module.css";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== "/" && scroll === false) {
      setScroll(true);
    }
    if (window.innerWidth <= 1050) {
      setScroll(true);
    }
  }, [scroll]);

  window.onscroll = () => {
    if (window.innerWidth >= 1050) {
      if (document.documentElement.scrollTop >= 140) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
  };

  return (
    <div
      className={style.header}
      style={{
        backgroundColor: scroll ? "white" : "transparent",
      }}
    >
      <div onClick={() => navigate("/")}>
        <BsFillHandbagFill className={style.bagIcon} />
        <h1
          style={{
            color: scroll ? "#ec437c" : "white",
          }}
        >
          UNIVERSAL SHOP
        </h1>
      </div>

      <div>
        <NavLink
          to="/mobile"
          className={style.link}
          style={{ color: scroll ? "#ec437c" : "white" }}
        >
          Mobile Phones
        </NavLink>
        <NavLink
          to="/tablet"
          className={style.link}
          style={{ color: scroll ? "#ec437c" : "white" }}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/laptop"
          className={style.link}
          style={{ color: scroll ? "#ec437c" : "white" }}
        >
          Laptops
        </NavLink>
      </div>
      <div>
        <button
          className={scroll ? style.btn2 : style.btn}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
          }}
          onClick={() => navigate("/cart")}
        >
          <RiShoppingCartLine
            style={{ fontSize: "20px", marginRight: "5px" }}
          />{" "}
          Cart
        </button>
        {localStorage.getItem("role") === undefined ||
        localStorage.getItem("role") === null ? (
          <NavLink
            to="/login"
            className={scroll ? style.btn2 : style.btn}
          >
            Login
          </NavLink>
        ) : (
          <>
            {localStorage.getItem("role") === "user" ? (
              <NavLink
                to="/dashboard"
                className={scroll ? style.btn2 : style.btn}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/adminpanel"
                className={scroll ? style.btn2 : style.btn}
              >
                Adminpanel
              </NavLink>
            )}
          </>
        )}
      </div>

      <div style={{ display: open ? "flex" : "none" }}>
        <NavLink
          to="/mobile"
          className={style.link}
          style={{ color: scroll ? "#ec437c" : "white" }}
        >
          Mobile Phones
        </NavLink>
        <NavLink
          to="/tablet"
          className={style.link}
          style={{ color: scroll ? "#ec437c" : "white" }}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/laptop"
          className={style.link}
          style={{ color: scroll ? "#ec437c" : "white" }}
        >
          Laptops
        </NavLink>
      </div>
      <div style={{ display: open ? "flex" : "none" }}>
        <button
          className={scroll ? style.btn2 : style.btn}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "10px",
          }}
          onClick={() => navigate("/cart")}
        >
          <RiShoppingCartLine
            style={{ fontSize: "20px", marginRight: "5px" }}
          />{" "}
          Cart
        </button>
        {localStorage.getItem("role") === undefined ||
        localStorage.getItem("role") === null ? (
          <NavLink
            to="/login"
            className={scroll ? style.btn2 : style.btn}
          >
            Login
          </NavLink>
        ) : (
          <>
            {localStorage.getItem("role") === "user" ? (
              <NavLink
                to="/dashboard"
                className={scroll ? style.btn2 : style.btn}
              >
                Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/adminpanel"
                className={scroll ? style.btn2 : style.btn}
              >
                Adminpanel
              </NavLink>
            )}
          </>
        )}
      </div>

      <HiOutlineMenu
        className={style.menu}
        onClick={() => setOpen(open ? false : true)}
      />
    </div>
  );
};

export default Navbar;
