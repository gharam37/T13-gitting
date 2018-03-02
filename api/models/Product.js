//const mongoose = require('mongoose');
const mongoose = require('mongoose');
var mongoDB = 'http://localhost:3000/';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
  name: 'shirt',
  price: 12,
  sellerName:'Mary'

});
var p2 =new Product( {
    name: 'shoes',
    price: 12,
    sellerName:'Mary',

});
var p3 =new Product( {
    name: 'short',
    price: 123,
    sellerName:'Mary',

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

//mongoose.ProductSchema.push(p1);
//db.productSchema.insert( p1 )
//mongoose.connection.collection(productSchema).insert(p1);
