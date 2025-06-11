import { useState, useEffect } from 'react';
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

    useEffect(() => {
        if (data) {
            setFormData({
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                dni: data.dni || '',
                email: data.email || '',
            });
        }
    }, [data]);

    useEffect(() => {
        console.log("Datos recibidos por AccountForm:", data);
    }, [data]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.put('/client/profile', formData);
            setClientData(res.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2500);
        } catch (err) {
            setError("No se pudo actualizar la información.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-blue-accent text-sm">Nombre</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-blue-dark text-white border border-blue-accent rounded px-3 py-2 mt-1"
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
                className="bg-blue-accent text-blue-dark w-full py-2 mt-2 rounded font-semibold hover:bg-blue-light transition"
            >
                Guardar cambios
            </button>
        </form>
    );
}
