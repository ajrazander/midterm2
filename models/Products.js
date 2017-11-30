var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: String,
  orders: {type: Number, default: 0},
  price: Number,
  url: String,
  selected: Boolean
});

ProductSchema.methods.upOrder = function(cb) {
  this.orders += 1;
  this.save(cb);
};

mongoose.model('Product', ProductSchema);
