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

var Product = mongoose.model('Product', productSchema);

var p1 = new Product({
    name:'c1',
    price:578,
    sellerName:'c1',
});
var p2 = new Product(
    {
        name:'c1',
        price:567,


        sellerName:'c1',
    }
);
var p3 = new Product(
    {
        name:'c1',
        price:34567,


        sellerName:'c1',
    }
);
var p4 = new Product(
    {
        name:'c1',
        price:5674,


        sellerName:'c1',
    }
);
var p5 = new Product(
    {
        name:'c2',
        price:6543,


        sellerName:'c2',
    }
);
var p6 = new Product(
    {
        name:'c2',
        price:876,


        sellerName:'c2',
    }
);
var p7 = new Product(
    {
        name:'c2',
        price:87654,


        sellerName:'c2',
    }
);
var p8 = new Product(
    {
        name:'c2',
        price:3864,


        sellerName:'c2',
    }
);
var p9 = new Product(
    {
        name:'c3',
        price:876543,


        sellerName:'c3',
    }
);
var p10 = new Product(
    {
        name:'c3',
        price:345653,


        sellerName:'c3',
    }
);
var p11 = new Product(
    {
        name:'c3',
        price:4636,


        sellerName:'c3',
    }
);
var p12 = new Product(
    {
        name:'c3',
        price:7348,


        sellerName:'c3',
    }
);
var p13 = new Product(
    {
        name:'c4',
        price:546,


        sellerName:'c4',
    }
);
var p14 = new Product(
    {
        name:'c4',
        price:6516,


        sellerName:'c4',
    }
);
var p15 = new Product(
    {
        name:'c4',
        price:386,


        sellerName:'c4',
    }
);
var p16 = new Product(
    {
        name:'c4',
        price:2468,


        sellerName:'c4',
    }
);
var p17 = new Product(
    {
        name:'c5',
        price:2582,


        sellerName:'c5',
    }
);
var p18 = new Product(
    {
        name:'c5',
        price:25724,


        sellerName:'c5',
    }
);
var p19 = new Product(
    {
        name:'c5',
        price:35272,


        sellerName:'c5',
    }
);
var p20 = new Product(
    {
        name:'c5',
        price:3727,


        sellerName:'c5',
    }
);

p1.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p2.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p3.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p4.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p5.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p6.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p7.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p8.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p9.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p10.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p11.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p12.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p13.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p14.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p15.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p16.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p17.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p18.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p19.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});
p20.save(function(error) {
    console.log("Your bee has been saved!");
    if (error) {
        console.error(error);
    }
});