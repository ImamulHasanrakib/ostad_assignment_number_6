import { createContext, useContext } from 'react';

export const FoodContext = createContext();
const useFood = () => {
  return useContext(FoodContext);
};

export default useFood;
