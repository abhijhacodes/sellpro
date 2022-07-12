require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const checkoutRoute = require("./routes/checkout");

// connecting server to database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

// necessary middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// // my custom routes
app.use("/api", authRoute);
app.use("/api", orderRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", checkoutRoute);

const port = process.env.BACKEND_SERVER_PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server is running at port ${port}`);
});
