import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import PriceOfferList from './pages/PriceOfferList';
import PriceOfferListProviders from './providers/PriceOfferListProviders';
import PriceOfferDetails from './pages/PriceOfferDetails';
import Home from './pages/Home';
import PriceOfferProviders from './providers/price_offer_providers/PriceOfferProviders';
import { UserInfoProvider } from './providers/UserInfoProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './error/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
      <UserInfoProvider>
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
      </UserInfoProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
