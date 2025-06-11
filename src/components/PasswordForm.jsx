import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import api from '../utils/api';

export default function PasswordForm() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Confirmá el endpoint, debería ser '/client/change-password'
            await api.put('/client/change-password', formData);
            setSuccess(true);
            setFormData({ currentPassword: '', newPassword: '' });
            setTimeout(() => setSuccess(false), 2500);
        } catch (err) {
            setError("Contraseña actual incorrecta o error al actualizar.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <h3 className="text-blue-accent font-semibold text-lg text-center mb-2">Cambiar contraseña</h3>
            
            <div className="relative">
                <label className="text-blue-accent text-sm">Contraseña actual</label>
                <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1 pr-10"
                    autoComplete="current-password"
                />
                <button
                    type="button"
                    onClick={() => setShowCurrent(v => !v)}
                    className="absolute right-3 top-9 text-blue-accent focus:outline-none"
                    tabIndex={-1}
                >
                    <FontAwesomeIcon icon={showCurrent ? faEyeSlash : faEye} />
                </button>
            </div>
            
            <div className="relative">
                <label className="text-blue-accent text-sm">Nueva contraseña</label>
                <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1 pr-10"
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    onClick={() => setShowNew(v => !v)}
                    className="absolute right-3 top-9 text-blue-accent focus:outline-none"
                    tabIndex={-1}
                >
                    <FontAwesomeIcon icon={showNew ? faEyeSlash : faEye} />
                </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">Contraseña actualizada correctamente ✅</p>}

            <button
                type="submit"
                className="bg-blue-accent text-blue-dark w-full py-2 mt-2 rounded font-semibold hover:bg-blue-light transition"
            >
                Cambiar contraseña
            </button>
        </form>
    );
}
