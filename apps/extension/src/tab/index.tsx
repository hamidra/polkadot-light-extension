import { HashRouter, Route, Routes } from 'react-router-dom';

import { initElement } from '../main';
import { AccountDetails } from './account-details';
import Layout from './layout/Layout.main';
import { ManageAccounts } from './manage-accounts';
import { CreateAccount } from './manage-accounts/CreateAccount';
import { ImportJson } from './manage-accounts/ImportJson';
import { Settings } from './settings';

const NavigatedApp = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='account-details' element={<AccountDetails />} />
          <Route path='manage-accounts'>
            <Route index element={<ManageAccounts />} />
            <Route path='create-account' element={<CreateAccount />} />
            <Route path='import-json' element={<ImportJson />} />
          </Route>
          <Route path='settings' element={<Settings />} />
          <Route index element={<ManageAccounts />} />
        </Route>
      </Routes>
    </>
  );
};

export const Tab = () => {
  return (
    <HashRouter>
      <NavigatedApp />
    </HashRouter>
  );
};

initElement(<Tab />);
