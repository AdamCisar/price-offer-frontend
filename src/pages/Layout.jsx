import Navbar from '../components/navbar_components/Navbar';

const Layout = ({children, isPencilWrapper, isAddInvoiceButton}) => {
  return (
    <div
      style={{ 
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        minHeight: '100vh',
      }}
      >
      <header>
        <Navbar isPencilWrapper={isPencilWrapper} isAddInvoiceButton={isAddInvoiceButton}/>
      </header>

      <main>
        {children}
      </main>

      <footer 
        style={{
          padding: "1em",
        }}
      >
        <p>&copy; 2024 Price Offer</p>
      </footer>
    </div>
  );
};

export default Layout;
