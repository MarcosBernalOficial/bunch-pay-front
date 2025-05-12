import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm({ onLogin, switchToRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        if (password.length > 16) {
            setError("La contraseña no puede tener más de 16 caracteres.");
            return;
        }

        setError("");
        onLogin(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-titulo leading-tight text-center text-primary mb-10 bg-surface py-6 px-10 rounded-2xl border border-primaryLight/50">
                Bunch Pay
            </h1>
            <form 
                onSubmit={handleSubmit} 
                className="bg-surface border border-primaryLight/50 font-texto p-6 rounded-2xl shadow-lg w-full"
            >
                {error && <p className="text-red-400 mb-3 text-sm text-center">{error}</p>}
                
                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full p-3 mb-3 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <div className="relative mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        className="w-full p-3 pr-10 rounded-lg bg-primaryLight/20 text-primary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primary hover:text-primaryLight transition"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-primary border border-primary text-surface py-3 mb-3 rounded-lg hover:bg-surface hover:text-primary hover:border hover:border-primary transition-colors duration-300 "
                >
                    Iniciar Sesión
                </button>
                
                <button
                    type="button"
                    onClick={switchToRegister}
                    className="w-full text-primary text-sm underline"
                >
                    Crear cuenta
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
