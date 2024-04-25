export const FETCH_FOODS = 'FETCH_FOODS';
export const CREATE_FOOD = 'CREATE_FOOD';
export const UPDATE_FOOD = 'UPDATE_FOOD';
export const DELETE_FOOD = 'DELETE_FOOD';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';

export const initialState = {
  foods: [],
  error: null,
};

const FoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FOODS':
      return {
        ...state,
        foods: action.payload,
      };
    case 'CREATE_FOOD':
      return {
        ...state,
        foods: [...state.foods, action.payload],
        error: null,
      };
    case 'UPDATE_FOOD':
      const updatedFoodIndex = state.foods.findIndex(
        (food) => food.id === action.payload.id
      );

      if (updatedFoodIndex === -1) {
        return {
          ...state,
          error: 'Food in not found',
        };
      }

      const foodUpdate = {
        ...state.foods[updatedFoodIndex],
        ...action.payload,
      };

      const updatedFoods = [
        ...state.foods.slice(0, updatedFoodIndex),
        foodUpdate,
        ...state.foods.slice(updatedFoodIndex + 1),
      ];

      return {
        ...state,
        foods: updatedFoods,
      };
    case 'DELETE_FOOD':
      const deletedFoodIndex = [...state.foods].findIndex(
        (food) => food._id === action.payload
      );

      console.log(deletedFoodIndex);

      if (deletedFoodIndex === -1) {
        return {
          ...state,
          error: 'Food id not found',
        };
      }

      const allFoods = [...state.foods].filter(
        (food) => food._id !== action.payload
      );

      return {
        ...state,
        foods: allFoods,
      };

    case 'REQUEST_FAILURE':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default FoodReducer;
