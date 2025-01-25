import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import PriceOfferList from './pages/PriceOfferList';
import PriceOfferListProviders from './providers/PriceOfferListProviders';
import PriceOfferDetails from './pages/PriceOfferDetails';
import PriceOfferProviders from './providers/price_offer_providers/PriceOfferProviders';
import GeneralAppProviders from './providers/GeneralAppProviders';
import './components/utilities/Functions';
import ItemsProviders from './providers/ItemsProviders';
import Items from './pages/Items';
import PrivateRoutes from './components/auth/PrivateRoutes';
import Login from './components/auth/Login';
import { SnackBarProvider } from './providers/SnackBarProvider';
import { useEffect, useState } from 'react';

function App() {

  useEffect(() => {
    // const deleteTokenBeforeUnload = (event) => {
    //   if (window.self === window.top) {
    //     return;
    //   }

    //   localStorage.removeItem('token');
    // };

    // window.addEventListener("beforeunload", deleteTokenBeforeUnload);

    // return () => {
    //     window.removeEventListener("beforeunload", deleteTokenBeforeUnload);
    // };
  }, []);

  useEffect(() => {

    const handleTokenFromExternalSource = (event) => {
        if (event.origin !== 'https://cisarvkp.sk') {
          console.warn('Received message from untrusted origin:', event.origin);
          return;
        }

        const { token } = event.data;

        if (!token) {
          console.log('No token received...');
          return;
        }
        
        console.log('Token received...');

        localStorage.setItem('token', token);
        window.location.href = '/cenove-ponuky';
    };

    window.addEventListener('message', handleTokenFromExternalSource);

    return () => {
        window.removeEventListener('message', handleTokenFromExternalSource);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/prihlasenie" element={<SnackBarProvider><Login /></SnackBarProvider>} />
      </Routes>

      <PrivateRoutes>
      <GeneralAppProviders>
        <Routes>
            <Route path="/" element={<Navigate to="/cenove-ponuky" replace />} />
            <Route path="/cenove-ponuky" element={
                                  <PriceOfferListProviders><Layout children={<PriceOfferList />} isPencilWrapper={true} />
                                  </PriceOfferListProviders>
                                } />
            <Route path="/cenove-ponuky/:id" element={<PriceOfferProviders><Layout children={<PriceOfferDetails />}/></PriceOfferProviders>} />

            <Route path="/produkty" element={<ItemsProviders><Layout children={<Items />} isPencilWrapper={true} /></ItemsProviders>} />
        </Routes>
      </GeneralAppProviders>
      </PrivateRoutes>
    </BrowserRouter>
  );
}

export default App;
