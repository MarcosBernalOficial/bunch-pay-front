import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import MyAccount from '../pages/MyAccount';
import TransferForm from '../components/TransferForm';
import AliasCvuForm from '../components/AliasCvuForm';
import CardForm from '../components/CardForm';

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
        </Routes>
    );
}
