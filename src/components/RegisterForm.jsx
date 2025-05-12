import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function RegisterForm({ switchToLogin }) {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        contraseña: "",
        dni: "",
        fechaNto: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const existingUsers = [
        { correo: "test@mail.com", dni: "12345678" },
        { correo: "jane@mail.com", dni: "87654321" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const key in formData) {
            if (!formData[key]) {
                setError("Todos los campos son obligatorios.");
                return;
            }
        }

        if (formData.contraseña.length > 16) {
            setError("La contraseña no puede tener más de 16 caracteres.");
            return;
        }

        const correoExists = existingUsers.some(
            (user) => user.correo === formData.correo
        );
        const dniExists = existingUsers.some((user) => user.dni === formData.dni);

        if (correoExists) {
            setError("El correo ya está registrado.");
            return;
        }
        if (dniExists) {
            setError("El DNI ya está registrado.");
            return;
        }

        setError("");
        alert("Cuenta creada (simulado). Ahora inicia sesión.");
        switchToLogin();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-titulo leading-tight text-center text-primary mb-10 bg-surface py-6 px-10 rounded-2xl border border-primaryLight/50">
                Bunch Pay
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-surface border border-primaryLight/50 font-texto p-6 rounded-2xl shadow-lg max-w-sm mx-auto"
            >
                {error && <p className="text-red-400 mb-3 text-sm text-center">{error}</p>}

                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        className="w-1/2 p-3 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        className="w-1/2 p-3 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    className="w-full p-3 mb-3 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    value={formData.correo}
                    onChange={handleChange}
                />

                <div className="relative mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="contraseña"
                        placeholder="Contraseña"
                        className="w-full p-3 pr-10 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                        value={formData.contraseña}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primary hover:text-primaryLight transition"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>

                <input
                    type="text"
                    name="dni"
                    placeholder="DNI"
                    className="w-full p-3 mb-3 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    value={formData.dni}
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="fechaNto"
                    className="w-full p-3 mb-3 rounded-lg bg-primaryLight/20 text-primary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    value={formData.fechaNto}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full bg-primary border border-primary text-surface py-3 rounded-lg hover:bg-surface hover:text-primary hover:border hover:border-primary transition-colors duration-300 mb-3"
                >
                    Crear Cuenta
                </button>
                <button
                    type="button"
                    onClick={switchToLogin}
                    className="w-full text-primaryLight text-sm underline hover:text-primary transition"
                >
                    Ya tengo cuenta
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
