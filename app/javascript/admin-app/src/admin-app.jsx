import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter  } from 'react-router-dom'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import store from './store';
import Layouts from './layouts'
import { THEME_CONFIG } from './configs/AppConfig';
import './lang'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

const themes = {
  dark: `./assets/css/dark-theme.css`,
  light: `./assets/css/light-theme.css`,
};


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
  },
});


function AdminApp() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <ThemeSwitcherProvider
              themeMap={themes} 
              defaultTheme={THEME_CONFIG.currentTheme} 
              insertionPoint="styles-insertion-point"
            >
              <Layouts />
            </ThemeSwitcherProvider>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default AdminApp;
