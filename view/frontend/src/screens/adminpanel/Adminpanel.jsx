// react
import React, { useState, useEffect } from "react";

// third party library
import axios from "axios";
import { toast } from "react-toastify";

// components
import { Navbar, Footer, Toast } from "../../components";

// react router
import { useNavigate } from "react-router-dom";

// Api url
import Base_URI from "../../core";

// loader
import loader from "../../images/loader.gif";

// css
import style from "./adminpanel.module.css";

const Adminpanel = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    click: false,
    edit: false,
    name: "",
    amount: "",
    image: {},
    stock: "",
    productdetails: "",
    category: "Mobile Phones",
  });
  const [editproduct, setEditProduct] = useState({
    click: false,
    index: null,
    id: "",
    name: "",
    amount: "",
    stock: "",
    productdetails: "",
    category: "Mobile Phones",
  });
  const [getproduct, setGetProduct] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let count = 0;

  const getCredentials = async () => {
    try {
      const response = await axios.get(`${Base_URI}getallusers/${token}`);

      if (response.data.message === "success") {
        setUser(response.data.data);

        try {
          const result = await axios.get(`${Base_URI}getallproducts`);

          if (result.data.message === "success") {
            setGetProduct(result.data.data);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          toast.error("Internal Server Error");
        }
      } else if (response.data.message === "UnAuth") {
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
      getCredentials();
    }
  }, [refresh]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", product.image);
    try {
      const response = await axios.post(
        `${Base_URI}imageUpload/${token}`,
        formData
      );
      if (response.data.message === "success") {
        try {
          const result = await axios.post(`${Base_URI}addproducts/${token}`, {
            name: product.name,
            stock: product.stock,
            amount: product.amount,
            category: product.category,
            productdetails: product.productdetails,
            image: response.data.data,
          });
          if (result.data.message === "success") {
            count--;
            setRefresh(!refresh);
            setLoading(false);
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
    setProduct({
      click: false,
      name: "",
      amount: "",
      image: {},
      stock: "",
      productdetails: "",
      category: "Mobile Phones",
    });
  };

  const deleteProduct = async (_id) => {
    setLoading(true);

    try {
      const response = await axios.delete(`${Base_URI}deleteproduct/${_id}`);

      if (response.data.message === "success") {
        count--;
        setRefresh(!refresh);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  const deleteUser = async (_id) => {
    setLoading(true);

    try {
      const response = await axios.delete(`${Base_URI}deleteuser/${_id}`);

      if (response.data.message === "success") {
        count--;
        setRefresh(!refresh);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Internal Server Error");
    }
  };

  const editProduct = async () => {
    setLoading(true);

    try {
      const response = await axios.put(`${Base_URI}editproduct/${token}`, {
        id: editproduct.id,
        name: editproduct.name,
        amount: editproduct.amount,
        stock: editproduct.stock,
        productdetails: editproduct.productdetails,
        category: editproduct.category,
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

    setEditProduct({
      click: false,
      index: null,
      id: "",
      name: "",
      amount: "",
      stock: "",
      productdetails: "",
      category: "Mobile Phones",
    });
  };

  return (
    <Component
      loading={loading}
      product={product}
      setProduct={setProduct}
      logout={logout}
      addProduct={addProduct}
      editProduct={editProduct}
      editproduct={editproduct}
      setEditProduct={setEditProduct}
      deleteProduct={deleteProduct}
      deleteUser={deleteUser}
      getproduct={getproduct}
      user={user}
    />
  );
};

class Component extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className={style.mainDiv}>
          <Toast />
          <h1>Adminpanel</h1>
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
            <div className={style.container}>
              {this.props.product.click ? (
                <div className={style.addProduct}>
                  <form onSubmit={(e) => this.props.addProduct(e)}>
                    <select
                      value={this.props.product.category}
                      onChange={(e) =>
                        this.props.setProduct({
                          ...this.props.product,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Mobile Phones">Mobile Phones</option>
                      <option value="Tablets">Tablets</option>
                      <option value="Laptops">Laptops</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Product Name"
                      required
                      value={this.props.product.name}
                      className={style.credentialField}
                      onChange={(e) =>
                        this.props.setProduct({
                          ...this.props.product,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Product Stock"
                      required
                      value={this.props.product.stock}
                      className={style.credentialField}
                      onChange={(e) =>
                        this.props.setProduct({
                          ...this.props.product,
                          stock: e.target.value,
                        })
                      }
                    />
                    <input
                      type="number"
                      placeholder="Product Amount"
                      required
                      value={this.props.product.amount}
                      className={style.credentialField}
                      onChange={(e) =>
                        this.props.setProduct({
                          ...this.props.product,
                          amount: e.target.value,
                        })
                      }
                    />
                    <textarea
                      cols="30"
                      rows="5"
                      placeholder="Product Details"
                      value={this.props.product.productdetails}
                      onChange={(e) =>
                        this.props.setProduct({
                          ...this.props.product,
                          productdetails: e.target.value,
                        })
                      }
                      className={style.textarea}
                    ></textarea>
                    <div>
                      <p>Select Image:</p>
                      <input
                        type="file"
                        className={style.imageInput}
                        required
                        onChange={(e) => {
                          this.props.setProduct({
                            ...this.props.product,
                            image: e.target.files[0],
                          });
                        }}
                      />
                    </div>
                    <input
                      type="submit"
                      className={style.btn}
                      style={{ marginTop: "5px" }}
                      value="Add"
                    />
                  </form>
                </div>
              ) : (
                <>
                  <button
                    className={style.btn}
                    onClick={this.props.logout}
                    style={{ marginRight: "10px" }}
                  >
                    Logout
                  </button>
                  <button
                    className={style.btn}
                    onClick={() =>
                      this.props.setProduct({
                        ...this.props.product,
                        click: true,
                      })
                    }
                  >
                    Add Product
                  </button>
                </>
              )}
              <div>
                <h2>All Products</h2>
                <div
                  className={style.underline}
                  style={{ width: "30px", height: "4px" }}
                ></div>
                <div className={style.subContainer}>
                  <table style={{ minWidth: "1450px" }}>
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>Product Category</th>
                        <th>Product Name</th>
                        <th>Product Details</th>
                        <th>Product Stock</th>
                        <th>Product Amount</th>
                        <th>Edit Product</th>
                        <th>Delete Product</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.getproduct.map((ele, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>
                              {this.props.editproduct.index === ind ? (
                                <select
                                  value={this.props.editproduct.category}
                                  onChange={(e) =>
                                    this.props.setEditProduct({
                                      ...this.props.editproduct,
                                      category: e.target.value,
                                    })
                                  }
                                >
                                  <option value="Mobile Phones">
                                    Mobile Phones
                                  </option>
                                  <option value="Tablets">Tablets</option>
                                  <option value="Laptops">Laptops</option>
                                </select>
                              ) : (
                                <>{ele.category}</>
                              )}
                            </td>
                            <td>
                              {this.props.editproduct.index === ind ? (
                                <input
                                  type="text"
                                  placeholder="Product Name"
                                  required
                                  value={this.props.editproduct.name}
                                  className={style.credentialField}
                                  onChange={(e) =>
                                    this.props.setEditProduct({
                                      ...this.props.editproduct,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                ele.name
                              )}
                            </td>
                            <td style={{ width: "400px" }}>
                              {this.props.editproduct.index === ind ? (
                                <textarea
                                  cols="30"
                                  rows="5"
                                  placeholder="Product Details"
                                  value={this.props.editproduct.productdetails}
                                  onChange={(e) =>
                                    this.props.setEditProduct({
                                      ...this.props.editproduct,
                                      productdetails: e.target.value,
                                    })
                                  }
                                  className={style.textarea}
                                ></textarea>
                              ) : (
                                ele.productdetails
                              )}
                            </td>
                            <td>
                              {this.props.editproduct.index === ind ? (
                                <input
                                  type="number"
                                  placeholder="Product Stock"
                                  required
                                  value={this.props.editproduct.stock}
                                  className={style.credentialField}
                                  onChange={(e) =>
                                    this.props.setEditProduct({
                                      ...this.props.editproduct,
                                      stock: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                ele.stock
                              )}
                            </td>
                            <td>
                              {this.props.editproduct.index === ind ? (
                                <input
                                  type="number"
                                  placeholder="Product Amount"
                                  required
                                  value={this.props.editproduct.amount}
                                  className={style.credentialField}
                                  onChange={(e) =>
                                    this.props.setEditProduct({
                                      ...this.props.editproduct,
                                      amount: e.target.value,
                                    })
                                  }
                                />
                              ) : (
                                ele.amount
                              )}
                            </td>
                            <td>
                              {this.props.editproduct.click ? (
                                <button
                                  className={style.btn}
                                  onClick={this.props.editProduct}
                                >
                                  Edit
                                </button>
                              ) : (
                                <button
                                  className={style.btn}
                                  onClick={() =>
                                    this.props.setEditProduct({
                                      click: true,
                                      index: ind,
                                      id: ele._id,
                                      name: ele.name,
                                      amount: ele.amount,
                                      category: ele.category,
                                      stock: ele.stock,
                                      productdetails: ele.productdetails,
                                    })
                                  }
                                >
                                  Edit Product
                                </button>
                              )}
                            </td>
                            <td>
                              <button
                                className={style.btn}
                                onClick={() =>
                                  this.props.deleteProduct(ele._id)
                                }
                              >
                                Delete Product
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h2>All Users</h2>
                <div
                  className={style.underline}
                  style={{ width: "30px", height: "4px" }}
                ></div>
                <div className={style.subContainer}>
                  <table style={{ minWidth: "700px" }}>
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Delete User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.user.map((ele, ind) => {
                        return (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{ele.name}</td>
                            <td>{ele.email}</td>
                            <td>
                              <button
                                className={style.btn}
                                onClick={() => this.props.deleteUser(ele._id)}
                              >
                                Delete User
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Adminpanel;
