import Navbar from '../components/navbar_components/Navbar';

const Layout = ({children, isPencilWrapper, isAddInvoiceButton}) => {
  return (
    <div>
      <header>
        <Navbar isPencilWrapper={isPencilWrapper} isAddInvoiceButton={isAddInvoiceButton}/>
      </header>

      <main>
        {children}
      </main>

      <footer>
        <p>&copy; 2024 Price Offer</p>
      </footer>
    </div>
  );
};

export default Layout;
