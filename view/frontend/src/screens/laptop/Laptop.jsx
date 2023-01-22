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
import style from "./laptop.module.css";

const Laptop = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  let count = 0;

  const getProducts = async () => {
    try {
      const result = await axios.get(`${Base_URI}getallproducts`);

      if (result.data.message === "success") {
        result.data.data.map((ele) => {
          if (ele.category === "Laptops") {
            product.push(ele);
          }
        });
        setProduct([...product]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    if (count === 0) {
      count++;
      getProducts();
    }
  }, []);

  return <Component loading={loading} product={product} navigate={navigate} />
};

class Component extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className={style.mainDiv}>
          <h1>Laptops</h1>
          <div className={style.underline}></div>
          {this.props.loading ? (
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
              {this.props.product.map((ele, ind, details) => {
                return (
                  <div
                    key={ind}
                    className={style.card}
                    onClick={() => {
                      localStorage.setItem(
                        "product",
                        JSON.stringify(details[ind])
                      );
                      this.props.navigate("/productdetails");
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
        </div>
        <Footer />
      </>
    );
  }
}

export default Laptop;
