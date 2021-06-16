const { check, validationResult } = require("express-validator");

exports.productValidation = [
  check("productName")
    .isLength({ min: 3 })
    .withMessage("product name should be atleast 3 char"),
  check("brand")
    .isLength({ min: 3 })
    .withMessage("brand name should be atleast 3 char"),
  check("description")
    .isLength({ min: 10 })
    .withMessage("description should be atleast 10 char"),
  check("price")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("price should be atleast 1 char"),
  check("stock")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("stock should be atleast 1 char"),
  check("category")
    .isLength({ min: 2 })
    .withMessage("category should be atleast 3 char"),
];
