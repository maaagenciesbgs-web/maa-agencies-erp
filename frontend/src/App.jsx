import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Customers from "./pages/Customers";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";

function App() {
  return (
    <div>
      <Dashboard />

      <hr />

      <Products />

      <hr />

      <ProductForm />

      <hr />

      <Customers />

      <hr />

      <Sales />

      <hr />

      <Reports />
    </div>
  );
}

export default App;