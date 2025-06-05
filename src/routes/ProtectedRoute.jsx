import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

