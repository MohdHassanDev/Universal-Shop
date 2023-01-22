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

// react icons
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// loader
import loader from "../../images/loader.gif";

// css
import style from "./checkout.module.css";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    box: false,
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const response = await axios.get(`${Base_URI}getuserdetails/${token}`);

      if (response.data.message === "success") {
        let short = response.data.data;
        if (short.address != undefined || short.address != null) {
          if (short.phone != undefined || short.phone != null) {
            setCredentials({
              ...credentials,
              name: short.name,
              email: short.email,
              address: short.address,
              phone: short.phone,
            });
          } else {
            setCredentials({
              ...credentials,
              name: short.name,
              email: short.email,
              address: short.address,
            });
          }
        } else {
          if (short.phone != undefined || short.phone != null) {
            setCredentials({
              ...credentials,
              name: short.name,
              email: short.email,
              phone: short.phone,
            });
          } else {
            setCredentials({
              ...credentials,
              name: short.name,
              email: short.email,
            });
          }
        }
        setLoading(false);
      } else if (response.data.message === "UnAuth") {
        setLoading(false);
        localStorage.clear();
        toast.error("Invalid or Expired Token");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  useEffect(() => {
    const products = localStorage.getItem("cart");
    if (products === null || products === undefined) {
    } else {
      setCart(JSON.parse(products));
    }
    if (token !== undefined || token !== null) {
      getUser();
    }
  }, []);

  const order = async () => {
    setLoading(true);

    if (token !== undefined || token !== null) {
      try {
        const response = await axios.get(`${Base_URI}getuserdetails/${token}`);

        if (response.data.message === "success") {
          let short = response.data.data;
          let order = [];

          const date = new Date();
          const millisecond = date.getMilliseconds();

          if (short.orders[0] != undefined) {
            order = short.orders;
            order.push({ products: cart, order_no: millisecond });
          } else {
            order.push({ products: cart, order_no: millisecond });
          }

          try {
            const result = await axios.put(`${Base_URI}edituser/${token}`, {
              name: credentials.name,
              address: credentials.address,
              phone: credentials.phone,
              email: credentials.email,
              orders: order,
            });

            if (result.data.message === "success") {
              setLoading(false);
              toast.success("Order Submitted Successfully");
            }
          } catch (error) {
            setLoading(false);
            toast.error("Internal Server Error");
          }
        } else if (response.data.message === "UnAuth") {
          setLoading(false);
          localStorage.clear();
          toast.error("Invalid or Expired Token");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Internal Server Error");
      }
    } else {
      setLoading(false);
      toast.success("Order Submitted Successfully");
    }

    setCredentials({
      box: false,
      name: "",
      address: "",
      phone: "",
      email: "",
    });
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <Component
      order={order}
      loading={loading}
      credentials={credentials}
      setCredentials={setCredentials}
      cart={cart}
      setCart={setCart}
    />
  );
};

class Component extends React.Component {
  render() {
    let a = 0;

    return (
      <>
        <Navbar />
        <Toast />
        <div className={style.mainDiv}>
          <h1>Checkout</h1>
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
            <>
              <div className={style.wrapper}>
                <h2>1. Delivery Details</h2>
                <form
                  onSubmit={() => {
                    return false;
                  }}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={this.props.credentials.name}
                    className={style.credentialField}
                    onChange={(e) =>
                      this.props.setCredentials({
                        ...this.props.credentials,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    name="email"
                    value={this.props.credentials.email}
                    className={style.credentialField}
                    onChange={(e) =>
                      this.props.setCredentials({
                        ...this.props.credentials,
                        email: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Phone Number"
                    required
                    name="phone number"
                    value={this.props.credentials.phone}
                    className={style.credentialField}
                    onChange={(e) =>
                      this.props.setCredentials({
                        ...this.props.credentials,
                        phone: e.target.value,
                      })
                    }
                  />
                  <textarea
                    cols="30"
                    rows="5"
                    placeholder="Address"
                    value={this.props.credentials.address}
                    onChange={(e) =>
                      this.props.setCredentials({
                        ...this.props.credentials,
                        address: e.target.value,
                      })
                    }
                    className={style.textarea}
                  ></textarea>
                </form>
                <h2 style={{ marginTop: "40px" }}>
                  2. Review Cart Items & Place Order
                </h2>
                <div style={{ marginTop: "20px" }}>
                  {this.props.cart[0] === undefined ? (
                    <h2>your cart is empty!</h2>
                  ) : (
                    <>
                      {this.props.cart.map((ele, ind) => {
                        return (
                          <div key={ind} className={style.product}>
                            <img src={ele.image.url} alt="product image" />
                            <h2>{ele.name}</h2>
                            <div>
                              <button
                                onClick={() => {
                                  if (this.props.cart[ind].quantity === 1) {
                                    this.props.cart.splice(ind, 1);
                                    this.props.setCart([...this.props.cart]);
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify(this.props.cart)
                                    );
                                  } else {
                                    this.props.cart[ind] = {
                                      ...this.props.cart[ind],
                                      quantity:
                                        this.props.cart[ind].quantity - 1,
                                    };
                                    this.props.setCart([...this.props.cart]);
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify(this.props.cart)
                                    );
                                  }
                                }}
                              >
                                <AiOutlineMinus style={{ color: "white" }} />
                              </button>
                              <h3>{ele.quantity}</h3>
                              <button
                                onClick={() => {
                                  this.props.cart[ind] = {
                                    ...this.props.cart[ind],
                                    quantity: this.props.cart[ind].quantity + 1,
                                  };
                                  this.props.setCart([...this.props.cart]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify(this.props.cart)
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
                  <h3 style={{ marginTop: "20px" }}>
                    Total:{" "}
                    {this.props.cart[0] === undefined
                      ? "PKR 0"
                      : this.props.cart.map((ele, ind, arr) => {
                          a = a + +ele.amount * ele.quantity;
                          if (ind === arr.length - 1) {
                            return "PKR " + a;
                          }
                        })}
                  </h3>
                </div>
              </div>
              <div className={style.checkbox}>
                <input
                  type="checkbox"
                  name="purpose"
                  checked={this.props.credentials.box}
                  onChange={() =>
                    this.props.setCredentials({
                      ...this.props.credentials,
                      box: this.props.credentials.box ? false : true,
                    })
                  }
                />
                <p>
                  I want to place a Cash on Delivery (COD) Order. I promise to
                  pay the delivery partner on delivery
                </p>
              </div>
              {this.props.cart[0] === undefined ? (
                <button
                  className={style.btn}
                  onClick={() => toast.error("Your Cart is Empty")}
                >
                  Pace Order
                </button>
              ) : (
                <>
                  {this.props.credentials.name !== "" &&
                  this.props.credentials.box !== false &&
                  this.props.credentials.address !== "" &&
                  this.props.credentials.phone !== "" ? (
                    <button className={style.btn} onClick={this.props.order}>
                      Pace Order
                    </button>
                  ) : (
                    <button
                      className={style.btn}
                      onClick={() =>
                        toast.error("Please fullfill all the fields Correctly")
                      }
                    >
                      Place Order
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Checkout;
