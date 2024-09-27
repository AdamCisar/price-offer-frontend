import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import PriceOfferList from './pages/PriceOfferList';
import PriceOfferListProviders from './providers/PriceOfferListProviders';
import PriceOfferDetails from './pages/PriceOfferDetails';
import Home from './pages/Home';
import PriceOfferProviders from './providers/price_offer_providers/PriceOfferProviders';
import GeneralAppProviders from './providers/GeneralAppProviders';
import './components/utilities/RoundPrice';

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
        </Routes>
    </BrowserRouter>
    </GeneralAppProviders>
  );
}

export default App;
