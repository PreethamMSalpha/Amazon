const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { check, validationResult } = require("express-validator");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No product found in DB",
          msg: err.message,
        });
      }
      res.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    let product = new Product(fields); //fields are already validated in routes

    //handle file here
    if (file.images) {
      if (file.images.size > 4000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.images.data = fs.readFileSync(file.images.path);
      product.images.contentType = file.images.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          msg: err.message,
          error: "Failed in saving product",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  res.product.photos = undefined;
  return res.json(req.product);
};

//middleware
exports.photos = (req, res, next) => {
  if (req.product.photos.data) {
    res.set("Content-Type", req.product.photos.contentType);
    return res.send(req.product.photos.data);
  }
  next();
};

//delete controller
exports.deleteProduct = (req, res) => {
  let product = req.product; //getting this from getProductById
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete ${deletedProduct.productName} product`,
      });
    }
    res.json({
      message: `${deletedProduct.productName} deleted successfully`,
    });
  });
};

//update controller
exports.updateProduct = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()[0].msg,
    });
  }

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: err.message,
      });
    }

    // updation code
    let product = req.product;
    product = _.extend(product, fields); // similar to spread operator

    //handle file here
    if (file.images) {
      if (file.images.size > 4000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.images.data = fs.readFileSync(file.images.path);
      product.images.contentType = file.images.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          msg: err.message,
          error: "Failed in updating product",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8; //from the url using ?
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-images")
    .populate("category")
    .sort([[sortBy, "asc"]])
    // .sort([["updatedAt", "descending"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: -product.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
