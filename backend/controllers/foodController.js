const asyncHandler = require('express-async-handler');
const FoodModel = require('../models/foodModel');
const { validationResult } = require('express-validator');
const fs = require('fs');
const validateMongoId = require('../middlewares/validateMongId');

const getAllFoods = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find().sort({ createdAt: -1 });
  res.status(200).json({
    message: 'Foods fetched successfully',
    foods: foods,
  });
});

const getFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateMongoId(id)) {
    return res.status(400).json({
      message: 'Invalid mongoose id',
    });
  }

  const food = await FoodModel.findById(id);

  if (!food) {
    return res.status(404).json({
      message: 'Food not found',
    });
  }

  res.status(200).json({
    message: 'Food fetched successfully',
    food: food,
  });
});
const createFood = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({
        message: 'Please upload an image',
      });
    }

    const { foodName, foodCategory, foodCode, foodQuantity, foodPrice } =
      req.body;
    req.body.foodImage = req.file.filename;

    if (isNaN(+foodCode) || isNaN(+foodQuantity) || isNaN(+foodPrice)) {
      fs.unlinkSync(`./uploads/${req.file.filename}`);
      return res.status(400).json({
        message: 'Code, quantity, price must be a number',
      });
    }

    const foodData = {
      name: foodName,
      category: foodCategory,
      code: Number(foodCode),
      quantity: Number(foodQuantity),
      image: req.body.foodImage,
      price: Number(foodPrice),
    };

    const food = await FoodModel.create(foodData);
    res.status(201).json({
      message: 'Food created successfully',
      food: food,
    });
  } catch (error) {
    res.status(500).json({
      message: error.stack,
    });
  }
});
const updateFood = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  if (!validateMongoId(id)) {
    return res.status(400).json({
      message: 'Invalid mongoose id',
    });
  }

  try {
    const { foodName, foodCategory, foodCode, foodQuantity, foodPrice } =
      req.body;

    const findFood = await FoodModel.findById(id);
    if (!findFood) {
      return res.status(404).json({
        message: 'Food Not found',
      });
    }

    if (isNaN(+foodCode) || isNaN(+foodQuantity) || isNaN(+foodPrice)) {
      res.status(400).json({
        message: 'Code, quantity, price must be a number',
      });
      return;
    }

    const updatedFoodData = {
      name: foodName,
      category: foodCategory,
      code: Number(foodCode),
      quantity: Number(foodQuantity),
      price: Number(foodPrice),
    };

    if (req.file) {
      updatedFoodData.image = req.file.filename;
      fs.unlinkSync(`./uploads/${findFood.image}`);
    }

    const updatedFood = await FoodModel.findByIdAndUpdate(id, updatedFoodData, {
      new: true,
    });

    res.status(200).json({
      message: 'Food updated successfully',
      food: updatedFood,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
const deleteFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!validateMongoId(id)) {
    return res.status(400).json({
      message: 'Invalid mongoose id',
    });
  }

  const findFood = await FoodModel.findById(id);

  if (!findFood) {
    return res.status(404).json({
      message: 'Food not found',
    });
  }

  const deleteFood = await FoodModel.findByIdAndDelete(id);
  fs.unlinkSync(`./uploads/${findFood.image}`);

  res.status(200).json({
    message: 'Food deleted successfully',
  });
});

module.exports = {
  createFood,
  updateFood,
  deleteFood,
  getAllFoods,
  getFood,
};
