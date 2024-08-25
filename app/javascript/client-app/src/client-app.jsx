import React from 'react';

import AllRoute from "./router";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";
import {QueryClientProvider, QueryClient} from "react-query";
const queryClient = new QueryClient();

const ClientApp = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <div className="App" id='scrool'>
                  <AllRoute/>
                  <ToastContainer/>
                </div>
              </QueryClientProvider>
            </PersistGate>
        </Provider>
    );
}

export default ClientApp;
