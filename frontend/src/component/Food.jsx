import { useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import API from '../api/apiInstance';
import useFood from '../food-context/FoodContext';
import { deleteFood } from '../food-context/actions';

const Food = ({ name, image, price, _id }) => {
  const [deleteConform, setDeleteConform] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { state, dispatch } = useFood();

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/${id}`);
      console.log(res);
      if (res.status === 200) {
        dispatch(deleteFood(id));
        setModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='border border-[#C8CBD9] rounded-[10px] overflow-hidden relative'>
        <div className='img_wrapper h-[180px]'>
          <img
            src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${image}`}
            alt={name}
            className='w-full h-full object-cover'
          />
        </div>
        <p className='absolute right-5 top-5 px-5 py-2 bg-[#A855F7] text-white text-[14px] font-normal rounded-md'>
          Taka:{price}
        </p>
        <div className='content px-3 py-5'>
          <h4 className='text-[#273240] text-[16px] font-medium mb-5'>
            {name}
          </h4>
          <div className='btn_group flex items-center gap-5 '>
            <Link
              to={`/edit-food/${_id}`}
              className='px-5 py-3 bg-[#F5F7FA] text-[#4CAF4F] rounded-lg'
            >
              Edit
            </Link>
            <button
              className='px-5 py-3 bg-[#FEE2E2] text-[#EF4444] rounded-lg'
              onClick={() => setModalOpen(true)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className='flex h-screen w-screen  items-center justify-center fixed  z-50 inset-0 bg-black/80'>
          <div className='w-[350px]  flex flex-col items-center justify-center  gap-7 rounded-md   bg-white p-7'>
            <RxCrossCircled
              size={70}
              className='text-red-600'
            />
            <div>
              <p className='text-center text-3xl text-gray-400 mb-3 font-semibold'>
                Are you sure you want to delete
              </p>
              <p className='text-blue-950 text-center text-lg'>
                &ldquo;{name}&rdquo;
              </p>
            </div>

            <div className='flex gap-5 items-center justify-center'>
              <button
                className='px-5 py-3 rounded-md bg-blue-950 gap-5 text-white'
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
              <button
                className='px-5 py-3 rounded-md bg-green-950 text-white'
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Food;
