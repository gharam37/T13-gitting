const express     = require('express'),
  router          = express.Router(),
  asyncMiddleware = require('express-async-handler'),
  config          = require('../config/Config'),
  jwt             = require('jsonwebtoken'),
  authCtrl     = require('../controllers/AuthController'),
  productCtrl     = require('../controllers/ProductController'),
  cartCtrl     = require('../controllers/ItemController');



//-------------------------------------------Auth------------------------------------------
router.post('/auth/sign-up', asyncMiddleware(authCtrl.signup));
router.post('/auth/sign-in', asyncMiddleware(authCtrl.login));
router.delete('/auth/sign-out', asyncMiddleware(authCtrl.logout));


//-----------------------------Block The Rest From Unauthorized User------------------------
// Route Middleware To Verify a Token
router.use( (req, res, next) =>  {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err)
      {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      else
      {
        req.decoded = decoded;
        next();
      }
    });
  }
  else
  {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});



//---------------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', asyncMiddleware(productCtrl.getProducts));
router.get('/product/getProduct/:productId', asyncMiddleware(productCtrl.getProduct));
router.get(
  '/product/getProductsBelowPrice/:price',
  asyncMiddleware(productCtrl.getProductsBelowPrice)
);
router.post('/product/createProduct', asyncMiddleware(productCtrl.createProduct));
router.patch('/product/updateProduct/:productId', asyncMiddleware(productCtrl.updateProduct));
router.delete('/product/deleteProduct/:productId', asyncMiddleware(productCtrl.deleteProduct));


//--------------------------------------Cart Routes------------------------------------------

router.get('/cart/getItems', asyncMiddleware(cartCtrl.getItems));
router.post('/cart/createItem', asyncMiddleware(cartCtrl.createItem));
router.delete('/cart/deleteItem/:productId', asyncMiddleware(cartCtrl.deleteItem));

//-------------------------------Return Router----------------------------------------------------
module.exports = router;
