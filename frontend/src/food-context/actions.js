import {
  CREATE_FOOD,
  DELETE_FOOD,
  FETCH_FOODS,
  REQUEST_FAILURE,
  UPDATE_FOOD,
} from './FoodReducer';

export const getFoods = (foods) => {
  return {
    type: FETCH_FOODS,
    payload: foods,
  };
};

export const createFood = (food) => {
  console.log(food);
  return {
    type: CREATE_FOOD,
    payload: food,
  };
};
export const updatedFood = (updateFood) => {
  return {
    type: UPDATE_FOOD,
    payload: updateFood,
  };
};

export const requestFailure = (error) => {
  return {
    type: REQUEST_FAILURE,
    payload: error,
  };
};
export const deleteFood = (id) => {
  console.log(id);
  return {
    type: DELETE_FOOD,
    payload: id,
  };
};
