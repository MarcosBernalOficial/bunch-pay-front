import { useState } from 'react';
import api from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function PasswordForm() {
    const [formData, setFormData] = useState({
        currentPass: '',
        newPass: '',
    });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.currentPass.trim() || !formData.newPass.trim()) {
            setError('Ambos campos son obligatorios.');
            return;
        }

        setLoading(true);
        try {
            await api.put('/client/change-password', formData);
            setSuccess(true);
            setFormData({ currentPass: '', newPass: '' });
            setTimeout(() => setSuccess(false), 2500);
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Contraseña actual incorrecta o error al actualizar.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <h3 className="text-blue-accent font-semibold text-lg text-center mb-2">Cambiar contraseña</h3>

            <div className="relative">
                <label className="text-blue-accent text-sm">Contraseña actual</label>
                <input
                    type={showCurrent ? 'text' : 'password'}
                    name="currentPass"
                    value={formData.currentPass}
                    onChange={handleChange}
                    className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1 pr-10"
                    disabled={loading}
                    autoComplete="current-password"
                />
                <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute inset-y-9 right-3 text-blue-accent"
                >
                    <FontAwesomeIcon icon={showCurrent ? faEyeSlash : faEye} />
                </button>
            </div>

            <div className="relative">
                <label className="text-blue-accent text-sm">Nueva contraseña</label>
                <input
                    type={showNew ? 'text' : 'password'}
                    name="newPass"
                    value={formData.newPass}
                    onChange={handleChange}
                    className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1 pr-10"
                    disabled={loading}
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute inset-y-9 right-3 text-blue-accent"
                >
                    <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
                </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">Contraseña actualizada correctamente ✅</p>}

            <button
                type="submit"
                disabled={loading}
                className={`bg-blue-accent text-blue-dark w-full py-2 mt-2 rounded font-semibold hover:bg-blue-light transition ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Cambiando...' : 'Cambiar contraseña'}
            </button>
        </form>
    );
}
