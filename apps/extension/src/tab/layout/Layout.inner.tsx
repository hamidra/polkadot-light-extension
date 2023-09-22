import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'ui';

const Layout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate('..', { relative: 'route' });
        }}
        variant='secondary'
        className='mb-3'
      >
        Back
      </Button>
      {children}
    </div>
  );
};

export default Layout;
