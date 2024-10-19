import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import PriceOfferList from './pages/PriceOfferList';
import PriceOfferListProviders from './providers/PriceOfferListProviders';
import PriceOfferDetails from './pages/PriceOfferDetails';
import PriceOfferProviders from './providers/price_offer_providers/PriceOfferProviders';
import GeneralAppProviders from './providers/GeneralAppProviders';
import './components/utilities/Functions';
import { ItemsProvider } from './providers/ItemsProvider';
import Items from './pages/Items';
import PrivateRoutes from './components/auth/PrivateRoutes';
import Login from './components/auth/Login';
import { SnackBarProvider } from './providers/SnackBarProvider';

function App() {
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

            <Route path="/produkty" element={<ItemsProvider><Layout children={<Items />} /></ItemsProvider>} />
        </Routes>
      </GeneralAppProviders>
      </PrivateRoutes>
    </BrowserRouter>
  );
}

export default App;
