import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../utils/api';
import { motion } from 'framer-motion';

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (data) => {
        try {
            await api.post('/auth/register', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                dni: data.dni,
            });

            setErrors({});
            setSuccessMessage('✅ Registro exitoso. Redirigiendo...');
            setTimeout(() => navigate('/login'), 1500);

        } catch (error) {
            console.error(error);
            setSuccessMessage('');
            if (error.response && error.response.status === 400 && typeof error.response.data === 'object') {
                setErrors(error.response.data);
            } else if (error.response && error.response.status === 409) {
                const { field, message } = error.response.data;
                if (field && message) {
                    setErrors({ [field]: message });
                } else {
                    setErrors({ general: error.response.data });
                }
            } else {
                setErrors({ general: 'Ocurrió un error inesperado. Intentá nuevamente.' });
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
                    Crear Cuenta
                </h2>

                {successMessage && (
                    <p className="text-green-400 text-sm text-center mt-2">
                        {successMessage}
                    </p>
                )}

                <AuthForm isLogin={false} onSubmit={handleRegister} errors={errors} />

                <p className="mt-4 text-center text-sm">
                    ¿Ya tenés cuenta?{' '}
                    <Link to="/login" className="underline text-blue-accent">
                        Iniciá sesión
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
