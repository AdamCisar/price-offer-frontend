import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import PriceOffer from './pages/PriceOffer';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/cenove-ponuky" element={<PriceOffer />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
