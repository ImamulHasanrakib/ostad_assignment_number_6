import { useState } from 'react';
import API from '../api/apiInstance';
import useFood from '../food-context/FoodContext';
import { createFood, requestFailure } from '../food-context/actions';
const CreateFood = () => {
  const [foodData, setFoodData] = useState({
    foodName: '',
    foodCategory: '',
    foodCode: '',
    foodQuantity: '',
    foodPrice: '',
    foodImage: '',
  });

  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useFood();
  const { error } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'file') {
      setFoodData({
        ...foodData,
        [name]: e.target.files[0],
      });
    } else {
      setFoodData({
        ...foodData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {};
    for (const field in foodData) {
      if (field === 'foodImage' && foodData['foodImage'] == '') {
        hasErrors = true;
        newErrors[field] = field + ' is required.';
      } else {
        if (field !== 'foodImage' && foodData[field].trim() === '') {
          hasErrors = true;
          newErrors[field] = field + ' is required.';
        }
      }
    }
    setFormError(newErrors);

    const formData = new FormData();
    formData.append('foodName', foodData.foodName);
    formData.append('foodCategory', foodData.foodCategory);
    formData.append('foodCode', foodData.foodCode);
    formData.append('foodQuantity', foodData.foodQuantity);
    formData.append('foodPrice', foodData.foodPrice);
    formData.append('foodImage', foodData.foodImage);

    if (!hasErrors) {
      setIsLoading(true);
      try {
        const res = await API.post('/create-food', formData);
        const food = res.data['food'];
        dispatch(createFood(food));
        setFoodData({
          foodName: '',
          foodCategory: '',
          foodCode: '',
          foodQuantity: '',
          foodPrice: '',
          foodImage: '',
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        dispatch(requestFailure(error.response?.data?.message));
        setIsLoading(false);
      }
    }
  };

  return (
    <section className='py-10 px-5'>
      <div className='content'>
        <h3 className='text-lg font-medium text-[#1F384C] mb-7'>
          Create Food Item
        </h3>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-3 food_form gap-10'>
            <div className='input_group '>
              <label
                htmlFor='foodName'
                className='block mb-2 text-[#000000] text-[14px] font-normal'
              >
                Food Name
              </label>
              <input
                type='text'
                id='foodName'
                name='foodName'
                value={foodData.foodName}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.foodName && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.foodName}
                </p>
              )}
            </div>
            <div className='input_group '>
              <label
                htmlFor='foodCode'
                className='block mb-2 text-[#000000] text-[14px] font-normal'
              >
                Food Code
              </label>
              <input
                type='text'
                id='foodCode'
                name='foodCode'
                value={foodData.foodCode}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.foodCode && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.foodCode}
                </p>
              )}
            </div>
            <div className='input_group '>
              <label
                htmlFor='foodImage'
                className='block mb-2 text-[#000000] text-[14px] font-normal'
              >
                Food Image
              </label>
              <input
                type='file'
                id='foodImage'
                name='foodImage'
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.foodImage && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.foodImage}
                </p>
              )}
            </div>
            <div className='input_group '>
              <label
                htmlFor='foodCategory'
                className='block mb-2 text-[#000000] text-[14px] font-normal'
              >
                Food Category
              </label>
              <input
                type='text'
                id='foodCategory'
                name='foodCategory'
                value={foodData.foodCategory}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.foodCategory && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.foodCategory}
                </p>
              )}
            </div>
            <div className='input_group '>
              <label
                htmlFor='foodQuantity'
                className='block mb-2 text-[#000000] text-[14px] font-normal'
              >
                QTY
              </label>
              <input
                type='text'
                id='foodQuantity'
                name='foodQuantity'
                value={foodData.foodQuantity}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.foodQuantity && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.foodQuantity}
                </p>
              )}
            </div>
            <div className='input_group '>
              <label
                htmlFor='foodPrice'
                className='block mb-2 text-[#000000] text-[14px] font-normal'
              >
                Food Price
              </label>
              <input
                type='text'
                id='foodPrice'
                name='foodPrice'
                value={foodData.foodPrice}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.foodPrice && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.foodPrice}
                </p>
              )}
            </div>
          </div>
          <button
            type='submit'
            className='max-w-max mt-10 px-7 py-3 bg-[#5A67BA] rounded-md text-white'
          >
            Submit
          </button>
        </form>
        {error && (
          <div className='px-5 py-3 bg-red-200 rounded-md mt-5  max-w-max text-gray-600'>
            <p>{error}</p>
          </div>
        )}
      </div>
    </section>
  );
};
export default CreateFood;
