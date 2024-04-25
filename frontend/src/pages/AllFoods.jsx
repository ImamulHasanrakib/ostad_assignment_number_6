import { useEffect, useState } from 'react';
import API from '../api/apiInstance';
import Food from '../component/Food';
import useFood from '../food-context/FoodContext';
import { getFoods, requestFailure } from '../food-context/actions';

const AllFoods = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useFood();

  const { foods, error } = state;

  const getAllFoods = async () => {
    try {
      setIsLoading(true);
      const res = await API.get('/get-foods');
      const foods = await res.data['foods'];
      dispatch(getFoods(foods));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(requestFailure(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='mx-auto '>
      <h4 className='mb-10'>All Food List</h4>

      {foods?.length > 0 ? (
        <div className='grid grid-cols-4 gap-7'>
          {foods?.map((food) => {
            return (
              <Food
                key={food._id}
                {...food}
              />
            );
          })}
        </div>
      ) : (
        <h1 className='text-3xl leading-relaxed text-gray-500 text-center'>
          There is no food available , please create a food
        </h1>
      )}
    </div>
  );
};
export default AllFoods;
