import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/apiInstance';
import useFood from '../food-context/FoodContext';
import { updatedFood } from '../food-context/actions';

const UpdateFood = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState({
    name: '',
    category: '',
    code: '',
    quantity: '',
    image: '',
    price: '',
  });

  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState(false);
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
    for (let field in foodData) {
      if (field === 'image' && foodData['image'] == '') {
        hasErrors = false;
        newErrors[field] = field + ' is required.';
      } else {
        if (field !== 'image' && foodData[field].trim() === '') {
          hasErrors = true;
          newErrors[field] = field + ' is required.';
        }
      }
    }
    setFormError(newErrors);

    const formData = new FormData();
    formData.append('foodName', foodData.name);
    formData.append('foodCategory', foodData.category);
    formData.append('foodCode', foodData.code);
    formData.append('foodQuantity', foodData.quantity);
    formData.append('foodPrice', foodData.price);
    formData.append('foodImage', foodData.image);

    if (!hasErrors) {
      setIsLoading(true);
      try {
        const res = await API.patch(`/${id}`, formData);
        const food = res.data['food'];
        dispatch(updatedFood(food));
        setFoodData({
          name: '',
          category: '',
          code: '',
          quantity: '',
          price: '',
          image: '',
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // dispatch(requestFailure(error.response.data.message));
        setIsLoading(false);
      }
    }
  };
  console.log(foodData);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getFood = async () => {
        const res = await API.get(`/get-food/${id}`);
        const { name, category, code, quantity, image, price } =
          res.data['food'];

        setFoodData({
          name: name,
          category: category,
          code: String(code),
          quantity: String(quantity),
          image: image,
          price: String(price),
        });
        setIsLoading(false);
      };
      getFood();
    } catch (error) {
      setInitError(error.response.data.message);
    }
  }, []);

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
                name='name'
                value={foodData.name}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.name && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.name}
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
                name='code'
                value={foodData.code}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.code && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.code}
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
                name='image'
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.image && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.image}
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
                name='category'
                value={foodData.category}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.category && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.category}
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
                name='quantity'
                value={foodData.quantity}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.quantity && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.quantity}
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
                name='price'
                value={foodData.price}
                className='px-5 py-3 bg-transparent outline-none border border-[#F1F2F7] rounded-md'
                onChange={handleChange}
              />
              {formError?.price && (
                <p className='text-[14px] text-red-500 mt-1'>
                  {formError?.price}
                </p>
              )}
            </div>
          </div>
          <button
            type='submit'
            className='max-w-max mt-10 px-7 py-3 bg-[#5A67BA] rounded-md text-white'
          >
            Update
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
export default UpdateFood;
