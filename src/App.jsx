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

function App() {
  return (
    <GeneralAppProviders>
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" redirect element={<Layout children={<Home />} />} /> */}
          <Route path="/" element={<Navigate to="/cenove-ponuky" replace />} />
          <Route path="/cenove-ponuky" >
            <Route index element={
                                  <PriceOfferListProviders><Layout children={<PriceOfferList />} isPencilWrapper={true} />
                                  </PriceOfferListProviders>
                                } />
            <Route path=':id' element={<PriceOfferProviders><Layout children={<PriceOfferDetails />}/></PriceOfferProviders>} />
          </Route>
          <Route path="/produkty" element={<ItemsProvider><Layout children={<Items />} /></ItemsProvider>} />
        </Routes>
    </BrowserRouter>
    </GeneralAppProviders>
  );
}

export default App;
