const mongoose = require('mongoose'),
  Validations = require('../utils/Validations'),
  Cart = mongoose.model('Cart');


module.exports.getItems = async (req, res) => {
  if(req.decoded)
  {
    Cart.find({buyerId:req.decoded.id}).populate('productId').then(cartItems => {
      res.status(200).json({
        err: null,
        msg: 'Products retrieved successfully.',
        data: cartItems
      });
    });
  }
  else
  {
    res.status(401).json({
      error : {message: 'Not Authorized'}
    });
  }

};

module.exports.createItem = async (req, res) => {
  if(Validations.isValidItem(req.decoded, req.body.productId))
  {
    const cartItem = new Cart();
    cartItem.buyerId = req.decoded.id;
    cartItem.productId = req.body.productId;
    cartItem.save().then(item => {
      res.status(200).json({
        err: null,
        msg: 'Items Added Successfully.',
        data: item
      });
    }).catch(() => {
      res.status(422).json({
        error : {message: 'Not Valid Data'}
      });
    });
  }
  else
  {
    res.status(422).json({
      error : {message: 'Not Valid Data'}
    });
  }
};

module.exports.deleteItem = async (req, res) => {
  if (!Validations.isObjectId(req.params.productId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  else
  {
    Cart.findOne({buyerId:req.decoded.id, productId:req.params.productId}).then(item => {
      if(item)
      {
        Cart.remove({_id:item._id}).then(deletedProduct => {
          res.status(200).json({
            err: null,
            msg: 'Product was deleted successfully.',
            data: deletedProduct
          });

        });
      }
      else
      {
        return res
          .status(404)
          .json({ err: null, msg: 'Product not found.', data: null });
      }
    });
  }
};
