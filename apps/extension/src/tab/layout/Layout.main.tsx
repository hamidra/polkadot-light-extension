import { Link, Outlet } from 'react-router-dom';

const links = [
  { name: 'Account Details', path: 'account-details' },
  { name: 'Manage Accounts', path: 'manage-accounts' },
  { name: 'Settings', path: 'settings' },
];

const Layout = () => (
  <main className='w-full h-full min-h-full bg-gray-200 flex flex-col'>
    <div className='h-14 w-full flex justify-center items-center mb-4 bg-white'>
      <ul className='flex'>
        {links.map(({ path, name }) => (
          <li key={path} className='mr-4 text-pink-600 uppercase'>
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
    <div className='flex justify-center'>
      <div className='w-3/4 lg:w-2/3 2xl:w-1/2 max-w-screen-lg'>
        <Outlet />
      </div>
    </div>
  </main>
);

export default Layout;
