import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css';

export const initElement = (page: JSX.Element) => {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  ReactDOM.createRoot(appContainer).render(
    <React.StrictMode>
      {page}
    </React.StrictMode>,
  )
};
