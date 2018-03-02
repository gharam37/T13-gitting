const mongoose = require('mongoose');
mongoose.connect('http://localhost:3000');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected.');
});



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

var Product =mongoose.model('Product',productSchema);

/*var p1 =new Product( {
    name: 'blue t-shirt',
    price: 12,
    sellerName:'Gharam',

});
var p2 =new Product( {
    name: 'black t-shirt',
    price: 30,
    sellerName:'Gharam',

});
p1.save(function(error) {
         console.log("Your bee has been saved!");
    if (error) {
             console.error(error);
          }
    });
*/