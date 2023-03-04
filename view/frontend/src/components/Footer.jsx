// react
import React from "react";

// react router
import { NavLink } from "react-router-dom";

// react icons
import { BsFillHandbagFill } from "react-icons/bs";

// css
import style from "./component.module.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div>
        <div>
          <BsFillHandbagFill
            className={style.bagIcon}
            style={{
              color: "white",
            }}
          />
          <h1>UNIVERSAL SHOP</h1>
        </div>
        <div>
          <NavLink to="/mobile" className={style.footerLinks}>
            Mobile Phones
          </NavLink>
          <NavLink to="/tablet" className={style.footerLinks}>
            Tablets
          </NavLink>
          <NavLink to="/laptop" className={style.footerLinks}>
            Laptops
          </NavLink>
        </div>
      </div>
      <hr />
      <p>Copyright © 2022 Universal Shop — All Rights Reserved</p>
    </div>
  );
};

export default Footer;
