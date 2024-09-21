import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import PriceOfferList from './pages/PriceOfferList';
import PriceOfferListProviders from './providers/PriceOfferListProviders';
import PriceOfferDetails from './pages/PriceOfferDetails';
import Home from './pages/Home';
import PriceOfferProviders from './providers/price_offer_providers/PriceOfferProviders';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout children={<Home />} />} />
          <Route path="/cenove-ponuky" >
            <Route index element={
                                  <PriceOfferListProviders><Layout children={<PriceOfferList />} isPencilWrapper={true} />
                                  </PriceOfferListProviders>
                                } />
            <Route path=':id' element={<PriceOfferProviders><Layout children={<PriceOfferDetails />}/></PriceOfferProviders>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
