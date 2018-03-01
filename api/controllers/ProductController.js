const mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Product = mongoose.model('Product'),
  ROLES = require('../config/Roles').ROLES;

module.exports.getProduct = async (req, res) => {
  if (!Validations.isObjectId(req.params.productId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  const product = await Product.findById(req.params.productId).exec();
  if (!product) {
    return res
      .status(404)
      .json({ err: null, msg: 'Product not found.', data: null });
  }
  res.status(200).json({
    err: null,
    msg: 'Product retrieved successfully.',
    data: product
  });
};

module.exports.getProducts = async (req, res) => {
  const products = await Product.find({}).exec();
  res.status(200).json({
    err: null,
    msg: 'Products retrieved successfully.',
    data: products
  });
};

module.exports.getProductsBelowPrice = async (req, res) => {
  if (!Validations.isNumber(req.params.price)) {
    return res.status(422).json({
      err: null,
      msg: 'price parameter must be a valid number.',
      data: null
    });
  }
  const products = await Product.find({
    price: {
      $lt: req.params.price
    }
  }).exec();
  res.status(200).json({
    err: null,
    msg:
      'Products priced below ' + req.params.price + ' retrieved successfully.',
    data: products
  });
};

module.exports.createProduct = async (req, res) => {
  if(req.decoded && req.decoded.role !== ROLES.viewer)
  {
    const valid =
      req.body.name &&
      Validations.isString(req.body.name) &&
      req.body.price &&
      Validations.isNumber(req.body.price);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'name(String) and price(Number) are required fields.',
        data: null
      });
    }
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    req.body.sellerName = req.decoded.name;
    const product = await Product.create(req.body);
    res.status(201).json({
      err: null,
      msg: 'Product was created successfully.',
      data: product
    });
  }
  else
  {
    res.status(401).json({
      err: null,
      msg: 'Not Authorized',
      data: null
    });
  }

};

module.exports.updateProduct = async (req, res) => {
  if(req.decoded && req.decoded.role !== ROLES.viewer)
  {
    if (!Validations.isObjectId(req.params.productId)) {
      return res.status(422).json({
        err: null,
        msg: 'productId parameter must be a valid ObjectId.',
        data: null
      });
    }
    const valid =
      req.body.name &&
      Validations.isString(req.body.name) &&
      req.body.price &&
      Validations.isNumber(req.body.price);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'name(String) and price(Number) are required fields.',
        data: null
      });
    }
    // Security Check
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: req.body
      },
      { new: true }
    ).exec();
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ err: null, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Product was updated successfully.',
      data: updatedProduct
    });
  }
  else
  {
    res.status(401).json({
      err: null,
      msg: 'Not Authorized',
      data: null
    });
  }

};

module.exports.deleteProduct = async (req, res) => {
  if(req.decoded && req.decoded.role === ROLES.admin)
  {
    if (!Validations.isObjectId(req.params.productId)) {
      return res.status(422).json({
        err: null,
        msg: 'productId parameter must be a valid ObjectId.',
        data: null
      });
    }
    const deletedProduct = await Product.findByIdAndRemove(
      req.params.productId
    ).exec();
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ err: null, msg: 'Product not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Product was deleted successfully.',
      data: deletedProduct
    });
  }
  else
  {
    res.status(401).json({
      err: null,
      msg: 'Not Authorized',
      data: null
    });
  }

};
