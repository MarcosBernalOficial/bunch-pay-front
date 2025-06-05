import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../utils/api';
import { motion } from 'framer-motion';

export default function Login() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (data) => {
        try {
        const response = await api.post('/auth/login', {
            email: data.email,
            password: data.password,
        });

        const userData = response.data;
        sessionStorage.setItem("user", JSON.stringify(userData));
        sessionStorage.setItem("token", userData.token);

        setLoginError('');
        navigate('/');
        } catch (error) {
            console.error(error);

            if (error.response && error.response.data) {
                const { message } = error.response.data;
                setLoginError(message || 'Error desconocido');
            } else {
                setLoginError('Credenciales inválidas o error en el servidor.');
            }
        }

    };

    return (
        <div className="min-h-screen bg-blue-dark flex items-center justify-center p-6">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-blue-mid rounded-xl p-8 shadow-xl border border-blue-accent text-white"
        >
            <h2 className="text-2xl font-bold text-center text-blue-accent mb-2">
            Iniciar Sesión
            </h2>

            {loginError && (
            <p className="text-red-400 text-sm text-center mb-4">
                {loginError}
            </p>
            )}

            <AuthForm isLogin={true} onSubmit={handleLogin} />

            <p className="mt-4 text-center text-sm">
            ¿No tenés cuenta?{' '}
            <Link to="/register" className="underline text-blue-accent">
                Registrate acá
            </Link>
            </p>
        </motion.div>
        </div>
    );
}
