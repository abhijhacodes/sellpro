const express = require("express");
const router = express.Router();

const {
  getProductById,
  uploadProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getVerifiedProducts,
  getUnverifiedProducts,
  getProductsByUser,
  adminDeleteProduct,
  adminApproveProduct,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

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

router.get("/products", getVerifiedProducts);
router.get("/products/:userId", isSignedIn, isAuthenticated, getProductsByUser);

// admin functions
router.get(
  "/admin/products/unverified/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getUnverifiedProducts
);

router.delete(
  "/admin/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  adminDeleteProduct
);

router.put(
  "/admin/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  adminApproveProduct
);

module.exports = router;
