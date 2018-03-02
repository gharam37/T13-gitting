const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  sellerName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model('Product', productSchema);

var Product =mongoose.model('Product',productSchema);

var p1 =new Product( {
  name: 'abc',
  price: 12,
  sellerName:'Gharam',

});
var p2 =new Product( {
    name: 'abb',
    price: 12,
    sellerName:'Mary',

});
var p3 =new Product( {
    name: 'ab33',
    price: 123,
    sellerName:'Abdullah',

});
var p4 =new Product( {
    name: 'aaabc',
    price: 12,
    sellerName:'Hazem',

});
p1.save(function(error) {
  console.log('Your bee has been saved!');
  if (error) {
    console.error(error);
  }
});
p2.save(function(error) {
    console.log('Your bee has been saved!');
    if (error) {
        console.error(error);
    }
});
p3.save(function(error) {
    console.log('Your bee has been saved!');
    if (error) {
        console.error(error);
    }
});
p4.save(function(error) {
    console.log('Your bee has been saved!');
    if (error) {
        console.error(error);
    }
});
//db.productSchema.insert( p1 )
//mongoose.connection.collection(productSchema).insert(p1);
