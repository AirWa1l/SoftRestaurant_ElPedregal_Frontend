import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardHomePage } from './pages/DashboardHomePage'
import { LoginPage } from './pages/LoginPage'
import { EditProfilePage } from './pages/EditProfilePage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import './App.css'

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<DashboardHomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  )
}

export default App
