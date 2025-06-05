import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function AccountForm({ data, setClientData }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dni: '',
        email: '',
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (data && !formData.firstName && !formData.lastName) {
        setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            dni: data.dni || '',
            email: data.email || '',
        });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
        setError('Nombre y apellido son obligatorios.');
        return;
        }

        setLoading(true);
        try {
        const res = await api.put('/client/profile', formData);
        setClientData(res.data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        } catch (err) {
        if (err.response?.data?.message) {
            setError(err.response.data.message);
        } else {
            setError('No se pudo actualizar la información.');
        }
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setClientData(null);
        navigate('/login');
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="text-blue-accent text-sm">Nombre</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1"
                disabled={loading}
            />
            </div>
            <div>
            <label className="text-blue-accent text-sm">Apellido</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1"
                disabled={loading}
            />
            </div>
            <div>
            <label className="text-blue-accent text-sm">DNI</label>
            <input
                type="text"
                value={formData.dni}
                readOnly
                className="w-full bg-gray-700 text-white border border-blue-accent rounded px-3 py-2 mt-1"
            />
            </div>
            <div>
            <label className="text-blue-accent text-sm">Email</label>
            <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full bg-gray-700 text-white border border-blue-accent rounded px-3 py-2 mt-1"
            />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">Datos actualizados correctamente ✅</p>}

            <button
            type="submit"
            className="bg-blue-accent text-blue-dark w-full py-2 mt-2 rounded font-semibold hover:bg-blue-light transition disabled:opacity-50"
            disabled={loading}
            >
            {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>

            <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="bg-red-600 text-white w-full py-2 mt-3 rounded font-semibold hover:bg-red-500 transition"
            >
            Cerrar sesión
            </button>
        </form>

        {/* Modal de confirmación */}
        {showLogoutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-blue-dark text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-lg font-semibold mb-4">¿Cerrar sesión?</h2>
                <p className="text-sm mb-6">¿Estás seguro de que querés cerrar sesión?</p>
                <div className="flex justify-end gap-3">
                <button
                    onClick={() => setShowLogoutModal(false)}
                    className="px-4 py-2 bg-blue-accent text-white rounded"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                >
                    Cerrar sesión
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
}
