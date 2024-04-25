const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Food category is required'],
      trim: true,
    },
    code: {
      type: Number,
      unique: true,
      required: [true, 'Food code is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Food Image is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Food price is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodModel = mongoose.model('Food', foodSchema);
module.exports = FoodModel;
