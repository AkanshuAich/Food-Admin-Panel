const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['fruit', 'vegetable'], required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  description: { type: String },
  nutritionalInfo: { type: Object },
});

module.exports = mongoose.model('Product', ProductSchema);