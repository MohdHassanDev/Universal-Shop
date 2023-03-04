// react
import React, { useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// components
import { Navbar, Footer } from "../../components";

// react icons
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// css
import style from "./cart.module.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  let a = 0;

  useEffect(() => {
    const products = localStorage.getItem("cart");
    if (products === null || products === undefined) {
    } else {
      setCart(JSON.parse(products));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className={style.mainDiv}>
        <h1>Shopping Cart</h1>
        <div className={style.underline}></div>
        <div className={style.wrapper}>
          {cart[0] === undefined ? (
            <h2>your cart is empty!</h2>
          ) : (
            <>
              {cart.map((ele, ind) => {
                return (
                  <div key={ind} className={style.product}>
                    <img src={ele.image.url} alt="product image" />
                    <h2>{ele.name}</h2>
                    <div>
                      <button
                        onClick={() => {
                          if (cart[ind].quantity === 1) {
                            cart.splice(ind, 1);
                            setCart([...cart]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(cart)
                            );
                          } else {
                            cart[ind] = {
                              ...cart[ind],
                              quantity: cart[ind].quantity - 1,
                            };
                            setCart([...cart]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify(cart)
                            );
                          }
                        }}
                      >
                        <AiOutlineMinus style={{ color: "white" }} />
                      </button>
                      <h3>{ele.quantity}</h3>
                      <button
                        onClick={() => {
                          cart[ind] = {
                            ...cart[ind],
                            quantity: cart[ind].quantity + 1,
                          };
                          setCart([...cart]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify(cart)
                          );
                        }}
                      >
                        <AiOutlinePlus style={{ color: "white" }} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <h3>
            SubTotal:{" "}
            {cart[0] === undefined
              ? "PKR 0"
              : cart.map((ele, ind, arr) => {
                  a = a + +ele.amount * ele.quantity;
                  if (ind === arr.length - 1) {
                    return "PKR " + a;
                  }
                })}
          </h3>
          <div className={style.btnDiv}>
            <button
              onClick={() => navigate("/checkout")}
              className={style.btn}
            >
              Checkout
            </button>
            <button
              className={style.btn}
              onClick={() => {
                localStorage.removeItem("cart");
                setCart([]);
              }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
