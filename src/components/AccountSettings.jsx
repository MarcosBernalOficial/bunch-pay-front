import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import LogoutModal from "./LogoutModal";




function AccountSettings({ onLogout }) {
    const [form, setForm] = useState({
        correo: "usuario@mail.com",
        dni: "123",
        fechaNto: "1999-01-01",
        nombre: "Marcos",
        apellido: "Bernal",
        passwordActual: "",
        passwordNueva: "",
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const [showActual, setShowActual] = useState(false);
    const [showNueva, setShowNueva] = useState(false);
    
    const [passwordGuardada, setPasswordGuardada] = useState("12345678");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleGuardar = () => {
        alert("Datos guardados exitosamente.");
    };

    const handleCambiarContraseña = () => {
        if (form.passwordActual !== passwordGuardada) {
        alert("La contraseña actual no es correcta.");
        return;
        }
        if (form.passwordNueva.length < 6) {
        alert("La nueva contraseña debe tener al menos 6 caracteres.");
        return;
        }
        setPasswordGuardada(form.passwordNueva);
        alert("Contraseña actualizada con éxito.");
        setForm({ ...form, passwordActual: "", passwordNueva: "" });
    };

    return (
        <div className="flex flex-col h-full bg-surface max-w-sm w-full mx-auto">
        <Header />

        <main className="flex-grow overflow-y-auto px-4 py-2 custom-scrollbar space-y-4">
            {/* Datos de cuenta */}
            <div className="bg-surface p-4 rounded-xl shadow-md border border-primary/50">
            <h2 className="text-primary font-titulo text-center mb-4">Datos de la cuenta</h2>
            <div className="space-y-2 font-texto">
                <div>
                <label className="text-sm text-primary font-semibold">Correo</label>
                <input
                    type="text"
                    value={form.correo}
                    disabled
                    className="w-full p-2 rounded bg-background text-textPrimary"
                />
                </div>
                <div>
                <label className="text-sm text-primary font-semibold">DNI</label>
                <input
                    type="text"
                    value={form.dni}
                    disabled
                    className="w-full p-2 rounded bg-background text-textPrimary"
                />
                </div>
                <div>
                <label className="text-sm text-primary font-semibold">Fecha de nacimiento</label>
                <input
                    type="date"
                    value={form.fechaNto}
                    disabled
                    className="w-full p-2 rounded bg-background text-textPrimary"
                />
                </div>
            </div>
            </div>

            {/* Datos modificables */}
            <div className="bg-surface p-4 rounded-xl shadow-md border border-primary/50">
            <h3 className="text-primary font-titulo text-center mb-4">Modificar datos</h3>
            <div className="flex gap-2 mb-4 font-texto">
                <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-1/2 p-2 rounded bg-background text-textPrimary"
                />
                <input
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="w-1/2 p-2 rounded bg-background text-textPrimary"
                />
            </div>
            <button
                onClick={handleGuardar}
                className="w-full bg-primary text-surface font-texto py-2 rounded hover:bg-primaryLight transition"
            >
                Guardar Cambios
            </button>
            </div>

            {/* Cambiar contraseña */}
            <div className="bg-surface p-4 rounded-xl shadow-md border border-primary/50">
            <h3 className="text-primary font-titulo text-center mb-4">Cambiar Contraseña</h3>
            
            <div className="space-y-2 font-texto">
                {/* Contraseña Actual */}
                <div className="relative">
                <input
                    type={showActual ? "text" : "password"}
                    name="passwordActual"
                    value={form.passwordActual}
                    onChange={handleChange}
                    placeholder="Contraseña Actual"
                    className="w-full p-2 pr-10 rounded bg-background text-textPrimary"
                />
                <button
                    type="button"
                    onClick={() => setShowActual(!showActual)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primary hover:text-primaryLight transition-colors duration-200"
                >
                    <FontAwesomeIcon icon={showActual ? faEyeSlash : faEye} />
                </button>
                </div>

                {/* Contraseña Nueva */}
                <div className="relative">
                <input
                    type={showNueva ? "text" : "password"}
                    name="passwordNueva"
                    value={form.passwordNueva}
                    onChange={handleChange}
                    placeholder="Contraseña Nueva"
                    className="w-full p-2 pr-10 rounded bg-background text-textPrimary"
                />
                <button
                    type="button"
                    onClick={() => setShowNueva(!showNueva)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primary hover:text-primaryLight transition-colors duration-200"
                >
                    <FontAwesomeIcon icon={showNueva ? faEyeSlash : faEye} />
                </button>
                </div>
            </div>

            <button
                onClick={handleCambiarContraseña}
                className="w-full mt-4 bg-primary text-surface font-texto py-2 rounded hover:bg-primaryLight transition"
            >
                Cambiar Contraseña
            </button>
            </div>


            {/* Soporte */}
            <button
            onClick={() => alert("Ir a Soporte (simulado)")}
            className="w-full bg-surface border border-primary/50 text-primary font-texto py-2 rounded-xl hover:bg-primary hover:text-surface transition"
            >
            Soporte Técnico
            </button>

            {/* Cerrar Sesion */}
            <button
                onClick={onLogout}
                className="w-full bg-red-300 text-red-600 border border-red-600 font-texto py-2 rounded-xl hover:bg-red-600 hover:text-surface transition"
                >
                Cerrar Sesión
            </button>
        </main>

        <Footer />
        </div>
    );
}

export default AccountSettings;
