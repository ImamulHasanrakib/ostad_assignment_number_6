const {
  createFood,
  updateFood,
  deleteFood,
  getAllFoods,
  getFood,
} = require('../controllers/foodController');

const uploadImage = require('../utils/photoUpload');
const router = require('express').Router();

router.get('/get-foods', getAllFoods);
router.get('/get-food/:id', getFood);
router.post('/create-food', uploadImage.single('foodImage'), createFood);
router.patch('/:id', uploadImage.single('foodImage'), updateFood);
router.delete('/:id', deleteFood);
module.exports = router;
