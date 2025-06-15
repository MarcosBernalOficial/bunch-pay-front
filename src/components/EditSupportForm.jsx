import { useState } from "react";
import api from "../utils/api";

export default function EditSupportForm({ support, onCancel, onSave }) {
    const [form, setForm] = useState({
        firstName: support.firstName,
        lastName: support.lastName,
        password: "", // nueva contraseña (opcional)
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const dataToSend = { ...form };

            // Si no se cargó contraseña, no la mandes
            if (!form.password.trim()) {
                delete dataToSend.password;
            }

            await api.put(`/support/${support.id}`, dataToSend);
            if (onSave) onSave();
        } catch (err) {
            console.error(err);
            setError("Error al guardar los cambios.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-blue-mid p-4 rounded-lg shadow-md border border-blue-accent mt-4 max-w-md mx-auto">
            <h2 className="text-blue-accent font-semibold mb-4 text-center">Editar soporte</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="w-full p-2 rounded bg-blue-dark text-white placeholder:text-blue-accent"
                />
                <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Apellido"
                    className="w-full p-2 rounded bg-blue-dark text-white placeholder:text-blue-accent"
                />
                <input
                    name="email"
                    type="email"
                    value={support.email}
                    readOnly // 👈 no editable
                    className="w-full p-2 rounded bg-blue-dark text-white placeholder:text-blue-accent opacity-70 cursor-not-allowed"
                />
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Nueva contraseña (opcional)"
                    className="w-full p-2 rounded bg-blue-dark text-white placeholder:text-blue-accent"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-accent text-blue-dark px-4 py-2 rounded font-bold hover:brightness-110"
                    >
                        {loading ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </div>
    );
}
