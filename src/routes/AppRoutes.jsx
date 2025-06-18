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

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
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
        </Routes>
    );
}
