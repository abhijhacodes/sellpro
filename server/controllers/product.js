const Product = require("../models/product");
const User = require("../models/user");
const formidable = require("formidable");
const { validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found in database",
        });
      }
      req.product = product;
      next();
    });
};

exports.uploadProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Some problem occured with image",
      });
    }

    const { name, description, price, category } = fields;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: "Please include all these fields",
      });
    }

    let product = new Product(fields);
    const publisherId = req.params.userId;
    product.userId = publisherId;

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too large!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: `Failed to upload ${name}`,
        });
      }
      res.json({
        message: `${name} uploaded and sent to admin for approval.`,
      });
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, prod) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete ${prod.name}`,
      });
    }
    res.json({
      message: `Deleted ${prod.name} successfully`,
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Some problem occured with image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too large!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.filepath);
      product.photo.contentType = file.photo.mimetype;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: `Failed to update ${product.name}.`,
        });
      }
      res.json(product);
    });
  });
};

exports.getVerifiedProducts = (req, res) => {
  Product.find({ isVerified: true })
    .select("-photo")
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Error occured while loading products",
        });
      }
      res.json(products);
    });
};

exports.getProductsByUser = (req, res) => {
  const userId = req.params.userId;
  Product.find({ userId: userId })
    .select("-photo -userId")
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "You haven't uploaded any product to sell",
        });
      }
      res.json(products);
    });
};

exports.getUnverifiedProducts = (req, res) => {
  Product.find({ isVerified: false })
    .select("-photo")
    .populate("category")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Error occured while loading unverified products",
        });
      }
      res.json(products);
    });
};

exports.adminDeleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, prod) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete ${prod.name}`,
      });
    }
    res.json({
      message: `Deleted ${prod.name} successfully.`,
    });
  });
};

exports.adminApproveProduct = (req, res) => {
  let product = req.product;
  Product.findByIdAndUpdate(
    product._id,
    { isVerified: true },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          error: `Failed to approve ${product.name}`,
        });
      } else {
        res.json({
          message: `Approved ${product.name} successfully.`,
        });
      }
    }
  );
};
