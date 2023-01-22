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
import style from "./dashboard.module.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let count = 0;

  const getUser = async () => {
    try {
      const response = await axios.get(`${Base_URI}getuserdetails/${token}`);

      if (response.data.message === "success") {
        let short = response.data.data;
        if (short.address != undefined || short.address != null) {
          if (short.phone != undefined || short.phone != null) {
            setUser({
              ...user,
              name: short.name,
              email: short.email,
              address: short.address,
              phone: short.phone,
            });
          } else {
            setUser({
              ...user,
              name: short.name,
              email: short.email,
              address: short.address,
            });
          }
        } else {
          if (short.phone != undefined || short.phone != null) {
            setUser({
              ...user,
              name: short.name,
              email: short.email,
              phone: short.phone,
            });
          } else {
            setUser({
              ...user,
              name: short.name,
              email: short.email,
            });
          }
        }
        if (short.orders[0] != undefined) {
          setOrders(short.orders);
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
    if (count === 0) {
      count++;
      getUser();
    }
  }, [refresh]);

  const edituser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`${Base_URI}edituser/${token}`, {
        name: user.name,
        address: user.address,
        phone: user.phone,
        email: user.email,
      });

      if (response.data.message === "success") {
        count--;
        setRefresh(!refresh);
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

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Component
      loading={loading}
      logout={logout}
      edituser={edituser}
      user={user}
      setUser={setUser}
      orders={orders}
    />
  );
};

class Component extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className={style.mainDiv}>
          <h1>Dashboard</h1>
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
            <div className={style.wrapper}>
              <button
                className={style.btn}
                onClick={this.props.logout}
                style={{ margin: 0, marginBottom: "20px" }}
              >
                Logout
              </button>
              <h2>1. Update Your Profile</h2>
              <form onSubmit={(e) => this.props.edituser(e)}>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={this.props.user.name}
                  className={style.credentialField}
                  onChange={(e) =>
                    this.props.setUser({
                      ...this.props.user,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  name="email"
                  value={this.props.user.email}
                  className={style.credentialField}
                  onChange={(e) =>
                    this.props.setUser({
                      ...this.props.user,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Phone Number"
                  required
                  name="phone number"
                  value={this.props.user.phone}
                  className={style.credentialField}
                  onChange={(e) =>
                    this.props.setUser({
                      ...this.props.user,
                      phone: e.target.value,
                    })
                  }
                />
                <textarea
                  cols="30"
                  rows="5"
                  placeholder="Address"
                  value={this.props.user.address}
                  onChange={(e) =>
                    this.props.setUser({
                      ...this.props.user,
                      address: e.target.value,
                    })
                  }
                  className={style.textarea}
                ></textarea>
                <input
                  type="submit"
                  value="Save"
                  className={style.btn}
                  style={{ margin: 0, width: "100px" }}
                />
              </form>
              <h2 style={{ marginTop: "40px" }}>2. Previous Orders</h2>
              <div className={style.subContainer}>
                <table style={{ minWidth: "700px" }}>
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>Order No</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  {this.props.orders.map((element, index) => {
                    return (
                      <tbody key={index}>
                        {element.products.map((ele, ind) => {
                          return (
                            <tr key={ind}>
                              <td>{index + 1}</td>
                              <td>{element.order_no}</td>
                              <td>{ele.name}</td>
                              <td>
                                <img src={ele.image.url} alt="product image" />
                              </td>
                              <td>{ele.quantity}</td>
                              <td>{ele.amount}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Dashboard;
