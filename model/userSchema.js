const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: String },
  phone: { type: String },
  role: { type: String, default: "user" },
  orders: [
    {
      products: [
        {
          name: { type: String },
          image: { type: Object },
          amount: { type: String },
          quantity: { type: String },
        },
      ],
      order_no: { type: String },
    },
  ],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
