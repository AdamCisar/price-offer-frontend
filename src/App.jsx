import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import PriceOffer from './pages/PriceOffer';
import { PencilEditProvider } from './providers/PencilEditProvider';
import { PriceOfferProvider } from './providers/PriceOfferProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <PencilEditProvider>
      <QueryClientProvider client={queryClient}>
        <PriceOfferProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/cenove-ponuky" element={<PriceOffer />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PriceOfferProvider>
      </QueryClientProvider>
    </PencilEditProvider>
  );
}

export default App;
