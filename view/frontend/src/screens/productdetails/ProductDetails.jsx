// react
import React, { useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// third party library
import { toast } from "react-toastify";

// components
import { Navbar, Footer, Toast } from "../../components";

// css
import style from "./productdetails.module.css";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("product");
    if (data !== null || data !== undefined) {
      setProduct(JSON.parse(data));
    } else {
      navigate("/");
    }
  }, []);

  const checkout = () => {
    if (product.stock !== "0") {
      const cart = localStorage.getItem("cart");

      if (cart != null || cart != undefined) {
        let parsed = JSON.parse(cart);
        let flag = true;
        parsed.map((ele, ind) => {
          if (ele.name === product.name) {
            parsed[ind] = {
              ...parsed[ind],
              quantity: parsed[ind].quantity + 1,
            };
            localStorage.setItem("cart", JSON.stringify(parsed));
            navigate("/checkout");
            flag = false;
          }
        });
        if (flag) {
          parsed.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(parsed));
          navigate("/checkout");
        }
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ ...product, quantity: 1 }])
        );
        navigate("/checkout");
      }
    } else {
      toast.error("Product is out of Stock");
    }
  };

  const viewcart = () => {
    if (product.stock !== "0") {
      const cart = localStorage.getItem("cart");

      if (cart !== null && cart !== undefined) {
        let parsed = JSON.parse(cart);
        let flag = true;
        parsed.map((ele, ind) => {
          if (ele.name === product.name) {
            parsed[ind] = {
              ...parsed[ind],
              quantity: parsed[ind].quantity + 1,
            };
            localStorage.setItem("cart", JSON.stringify(parsed));
            navigate("/cart");
            flag = false;
          }
        });
        if (flag) {
          parsed.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(parsed));
          navigate("/cart");
        }
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([{ ...product, quantity: 1 }])
        );
        navigate("/cart");
      }
    } else {
      toast.error("Product is out of Stock");
    }
  };

  return (
    <>
      <Navbar />
      <Toast />
      <div className={style.mainDiv}>
        <h1>Product Details</h1>
        <div className={style.underline}></div>
        <div className={style.wrapper}>
          <div>
            <img src={product?.image?.url} alt="product image" />
            <div>
              <h1>{product.name}</h1>
              <p>{product.productdetails}</p>
              <h3>Stock Available: {product.stock}</h3>
              <div>
                <h2>PKR {product.amount}</h2>
                <button onClick={checkout} className={style.btn}>
                  Buy Now
                </button>
                <button onClick={viewcart} className={style.btn}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
