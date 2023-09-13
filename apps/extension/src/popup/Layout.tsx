import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className='flex h-[48rem] w-96 items-start justify-center'>
    <Outlet />
  </div>
);

export default Layout;
