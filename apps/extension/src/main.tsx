import React from 'react';
import ReactDOM from 'react-dom/client';
import 'ui/global.css';

let appContainer: Element | null = null;

export const initElement = (page: JSX.Element) => {
  if (!appContainer) {
    appContainer = document.querySelector('#app-container');
    ReactDOM.createRoot(appContainer!).render(<React.StrictMode>{page}</React.StrictMode>);
  }
};
