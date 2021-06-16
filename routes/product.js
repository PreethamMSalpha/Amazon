const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photos,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const validator = require("../middlewares/validators/productValidator");

//params - as soon as the router hits :userId or :productId params gonna fire up
router.param("userId", getUserById);
router.param("productId", getProductById);

//*********actual routes**************

//create route
router.post(
  "/product/create/:userId",
  validator.productValidation,
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photos); //calling this route from frontend

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing route for homepage
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
