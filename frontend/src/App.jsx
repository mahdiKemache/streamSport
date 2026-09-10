import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import HomePage from './pages/public/HomePage';
import MatchDetailsPage from './pages/public/MatchDetailsPage';
import { authService } from './services/authService';

function ProtectedAdminRoute() {
  return authService.getToken() ? <AdminDashboardPage /> : <Navigate to="/admin/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/matches/:id" element={<MatchDetailsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
