import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";

import Customers from "./pages/Customers";
import CustomerForm from "./pages/CustomerForm";

import Suppliers from "./pages/Suppliers";
import SupplierForm from "./pages/SupplierForm";

import Purchases from "./pages/Purchases";
import PurchaseForm from "./pages/PurchaseForm";
import PurchaseHistory from "./pages/PurchaseHistory";
import ViewPurchase from "./pages/ViewPurchase";

import SaleForm from "./pages/SaleForm";
import SalesHistory from "./pages/SalesHistory";
import ViewSale from "./pages/ViewSale";

import Reports from "./pages/Reports";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductForm />} />

        {/* Customers */}
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/add" element={<CustomerForm />} />

        {/* Suppliers */}
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/add" element={<SupplierForm />} />

        {/* Purchases */}
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/purchases/add" element={<PurchaseForm />} />
        <Route path="/purchases/edit/:id" element={<PurchaseForm />} />
        <Route path="/purchases/view/:id" element={<ViewPurchase />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />

        {/* Sales */}
        <Route path="/sales" element={<SalesHistory />} />
        <Route path="/sales/add" element={<SaleForm />} />
        <Route path="/sales/edit/:id" element={<SaleForm />} />
        <Route path="/sales-history" element={<SalesHistory />} />

        <Route path="/sales/view/:id" element={<ViewSale />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/invoice/:id" element={<Invoice />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;