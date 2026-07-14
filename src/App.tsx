import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardHomePage } from './pages/DashboardHomePage'
import { LoginPage } from './pages/LoginPage'
import { EditProfilePage } from './pages/EditProfilePage'
import { ProductsPage } from './pages/ProductPage'
import { ProductCreatePage } from './pages/ProductCreatePage'
import { ProductEditPage } from './pages/ProductEditPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { NewOrderPage } from './pages/NewOrderPage'
import { OrdersPage } from './pages/OrdersPage'
import { EditOrderPage } from './pages/EditOrderPage'
import { SalesPage } from './pages/SalesPage'
import { WhatsAppButton } from './components/layout/whatsapp/WhatsAppButton'
import './App.css'

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<DashboardHomePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={<ProductCreatePage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:number/edit" element={<EditOrderPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
        <WhatsAppButton />
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
