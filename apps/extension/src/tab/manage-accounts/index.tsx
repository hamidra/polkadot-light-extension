import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from 'ui';

const links = [
  { name: 'Create Account', path: '/manage-accounts/create-account' },
  { name: 'Import JSON', path: '/manage-accounts/import-json' },
];
export const ManageAccounts = () => {
  return (
    <>
      <Card>
        <CardHeader>Manage Accounts</CardHeader>
        <CardContent className='grid gap-4'>
          <ul className='flex'>
            {links.map(({ path, name }) => (
              <li key={path} className='mr-4 text-pink-600 uppercase'>
                <Link to={path}>{name}</Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
