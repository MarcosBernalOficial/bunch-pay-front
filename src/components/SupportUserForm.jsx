import { useState } from "react";
import api from "../utils/api";

export default function SupportUserForm({ onSuccess }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await api.post("/support/create", {
            ...form,
            role: "SUPPORT",
            });

            setSuccess("Cuenta de soporte creada con éxito.");
            setForm({ firstName: "", lastName: "", email: "", password: "" });
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);

            // ✅ Solo mostrar mensaje de error, y asegurarte de NO mostrar éxito
            setSuccess("");
            if (err.response?.status === 409) {
            setError("Ese correo ya está registrado.");
            } else {
            setError("Error al crear el soporte. El correo ya existe");
            }
        }
    };


    return (
        <div className="max-w-md mx-auto bg-blue-mid p-6 rounded-xl shadow-md border border-blue-accent">
        <h2 className="text-xl font-semibold text-blue-accent mb-4 text-center">Crear cuenta de soporte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            name="firstName"
            placeholder="Nombre"
            value={form.firstName}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-blue-dark text-white placeholder:text-blue-accent"
            />
            <input
            name="lastName"
            placeholder="Apellido"
            value={form.lastName}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-blue-dark text-white placeholder:text-blue-accent"
            />
            <input
            name="email"
            placeholder="Correo electrónico"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-blue-dark text-white placeholder:text-blue-accent"
            />
            <input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded border bg-blue-dark text-white placeholder:text-blue-accent"
            />
            <button
            type="submit"
            className="w-full bg-blue-accent text-blue-dark p-2 rounded font-bold"
            >
            Crear Soporte
            </button>
        </form>

        {success && <p className="mt-4 text-green-400">{success}</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>
    );
}
