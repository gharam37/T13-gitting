const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

mongoose.model('Cart', cartSchema);
