import { BsFillCartDashFill } from 'react-icons/bs';
import { MdLibraryBooks } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Brand from '../assets/Logo.png';

const Sidebar = () => {
  return (
    <aside className='w-[240px] bg-[#F1F2F7] flex-shrink-0  fixed top-0 h-screen left-0 z-30'>
      <div className='logo h-[65px] py-5 pl-10 border-b-[.5px] border-[#C8CBD9]'>
        <img
          src={Brand}
          alt='brand logo'
          className='w-[100px]'
        />
      </div>
      <div className='py-10 px-5'>
        <span className='mb-5 pl-5 block'>Menu</span>
        <div className='links flex flex-col gap-2'>
          <NavLink
            to='/create-food'
            className={({ isActive }) =>
              (isActive ? 'bg-[#707FDD]/10 text-[#5A67BA]' : '') +
              ' flex items-center px-5 py-3 rounded-md gap-[15px] text-[#273240] '
            }
          >
            <BsFillCartDashFill size={20} />
            Create Food
          </NavLink>
          <NavLink
            to='/'
            className={({ isActive }) =>
              (isActive ? 'bg-[#707FDD]/10 text-[#5A67BA]' : '') +
              ' flex items-center px-5 py-3 rounded-md gap-[15px] text-[#273240] '
            }
          >
            <MdLibraryBooks size={20} />
            All Foods
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
