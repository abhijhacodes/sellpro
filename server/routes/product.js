const express = require("express");
const router = express.Router();

const {
  getProductById,
  uploadProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductsByUser,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { check } = require("express-validator");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/upload/:userId",
  isSignedIn,
  isAuthenticated,
  uploadProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteProduct
);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  updateProduct
);

router.get("/products", getAllProducts);
router.get("/products/:userId", isSignedIn, isAuthenticated, getProductsByUser);

module.exports = router;
