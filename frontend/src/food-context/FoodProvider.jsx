import { useReducer } from 'react';
import { FoodContext } from './FoodContext';
import FoodReducer, { initialState } from './FoodReducer';

const FoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FoodReducer, initialState);
  return (
    <FoodContext.Provider value={{ state, dispatch }}>
      {children}
    </FoodContext.Provider>
  );
};
export default FoodProvider;
