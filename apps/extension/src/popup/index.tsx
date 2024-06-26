import CreatePage from 'create';
import ImportPage from 'import';
import { HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { initElement } from '@src/main';

import AccountsPage from './AccountsPage';
import Layout from './Layout';
import WelcomePage from './WelcomePage';

const NavigatedApp = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<WelcomePage />} />
        <Route path='accounts' element={<AccountsPage />} />
        <Route
          path='create'
          element={
            <CreatePage
              onSuccess={() => {
                navigate('/');
              }}
            />
          }
        />
        <Route
          path='import'
          element={
            <ImportPage
              onSuccess={() => {
                navigate('/');
              }}
            />
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  );
};

export const PopUp = () => {
  return (
    <HashRouter>
      <NavigatedApp />
    </HashRouter>
  );
};

initElement(<PopUp />);
