import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainDashboard from './components/MainDashboard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AccountSettings from './components/AccountSettings';
import LogoutModal from './components/LogoutModal';


function App() {
  const [view, setView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    if (email === 'prueba@mail.com' && password === '123') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };

  const confirmLogout = () => setShowLogoutConfirm(true);
  const cancelLogout = () => setShowLogoutConfirm(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('login');
    navigate('/');
    setShowLogoutConfirm(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-background w-full max-w-sm h-[80dvh] flex flex-col rounded-xl overflow-hidden relative">
        {!isAuthenticated ? (
          <div className="flex flex-col flex-grow p-4 justify-center">
            {view === 'login' ? (
              <LoginForm
                onLogin={handleLogin}
                switchToRegister={() => setView('register')}
              />
            ) : (
              <RegisterForm switchToLogin={() => setView('login')} />
            )}
          </div>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<MainDashboard />} />
              <Route path="/account" element={<AccountSettings onLogout={confirmLogout} />} />
            </Routes>

            {/* Modal de confirmación de logout */}
            {showLogoutConfirm && (
              <LogoutModal
                onConfirm={handleLogout}
                onCancel={cancelLogout}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
