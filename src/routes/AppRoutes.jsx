import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import MyAccount from '../pages/MyAccount';
import TransferForm from '../components/TransferForm';
import AliasCvuForm from '../components/AliasCvuForm';
import CardForm from '../components/CardForm';
import AdminPanel from "../pages/AdminPanel";
import ClientSupportPage from "../pages/ClientSupportPage";
import SupportPage from "../pages/SupportPage";
import Movimientos from '../components/Movimientos';
import Notifications from '../pages/Notifications';
import Balance from '../components/BalanceDashboard';
import CryptoPrices from "../components/CryptoPrices";
import BenefitsAndServices from '../components/BenefitsAndServices';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/account"
                element={
                    <ProtectedRoute>
                        <MyAccount />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/transfer"
                element={
                    <ProtectedRoute>
                        <TransferForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/alias-cvu"
                element={
                    <ProtectedRoute>
                        <AliasCvuForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/card"
                element={
                    <ProtectedRoute>
                        <CardForm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute roles={["ADMIN"]}>
                    <AdminPanel />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/client/support"
                element={
                    <ProtectedRoute roles={["CLIENT"]}>
                    <ClientSupportPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/support"
                element={
                    <ProtectedRoute roles={["SUPPORT"]}>
                        <SupportPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/movimientos"
                element={
                    <ProtectedRoute>
                        <Movimientos />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Notifications />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/Balance"
                element={
                    <ProtectedRoute>
                        <Balance />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/crypto"
                element={
                    <ProtectedRoute>
                        <CryptoPrices />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/benefits"
                element={
                    <ProtectedRoute>
                        <BenefitsAndServices />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}
