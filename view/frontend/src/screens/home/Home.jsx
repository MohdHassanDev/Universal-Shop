// react
import React, { useEffect, useState } from "react";

// third party library
import axios from "axios";
import { toast } from "react-toastify";

// react router
import { useNavigate } from "react-router-dom";

// components
import { Navbar, Footer, Toast } from "../../components";

// Api url
import Base_URI from "../../core";

// loader
import loader from "../../images/loader.gif";

// css
import style from "./home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const result = await axios.get(`${Base_URI}getallproducts`);

      if (result.data.message === "success") {
        setProduct(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={style.mainDiv}>
        <Navbar />
        <Toast />
        <section className={style.container}>
          <div>
            <div className={style.subContainer}>
              <h2>
                We are here to make your life easier. By introducing a
                Universal Shop Carrying more than 20 Brands.
              </h2>
              <p>Your Satisfaction is our guarantee</p>
              <a href="#latestProducts">Shop Now</a>
            </div>
          </div>
        </section>
        <section className={style.latestProducts} id="latestProducts">
          <h1>Latest Products:</h1>
          <div className={style.underline}></div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              <img src={loader} alt="loader" width="130px" />
            </div>
          ) : (
            <div className={style.cardWrapper}>
              {product.map((ele, ind, details) => {
                return (
                  <div
                    key={ind}
                    className={style.card}
                    onClick={() => {
                      localStorage.setItem(
                        "product",
                        JSON.stringify(details[ind])
                      );
                      navigate("/productdetails");
                    }}
                  >
                    <img src={ele.image.url} alt="product image" />
                    <div>
                      <p>{ele.category}</p>
                      <h3>{ele.name}</h3>
                      <h3>PKR {ele.amount}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );  
};

export default Home;
