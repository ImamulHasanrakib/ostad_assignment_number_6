const mongoose = require('mongoose');

const validateMongoId = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};

module.exports = validateMongoId;
