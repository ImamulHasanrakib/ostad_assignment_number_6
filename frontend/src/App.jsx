import { Route, Routes } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import AllFoods from './pages/AllFoods';
import CreateFood from './pages/CreateFood';
import EditFood from './pages/EditFood';

const App = () => {
  return (
    <>
      <main className='mr-10 pl-[300px] mt-[64px] py-10 before:content-[""] before:fixed before:top-0 before:h-[65px] before:left-[240px] before:right-0 before:bg-white before:z-50 before:border-b-[.5px] before:[#C8CBD9]  '>
        <Sidebar />
        <Routes>
          <Route
            path='/'
            element={<AllFoods />}
          />
          <Route
            path='/create-food'
            element={<CreateFood />}
          />
          <Route
            path='/edit-food/:id'
            element={<EditFood />}
          />
        </Routes>
      </main>
    </>
  );
};
export default App;
