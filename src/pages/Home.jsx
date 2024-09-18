import React from 'react';
import ProductTable from '../components/ProductTable';
import { ProductsProvider } from '../providers/ProductsProvider';
// import { Link } from 'react-router-dom';
// import './Home.css';

const Home = () => {

    return (
        <div className="home">
            <ProductsProvider>
                <ProductTable />
            </ProductsProvider>
        </div>  
    )
}    
export default Home