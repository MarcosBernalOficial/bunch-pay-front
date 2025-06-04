import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


export default function AuthForm({ isLogin = true, onSubmit, errors = {} }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dni: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.form
        onSubmit={handleSubmit}
        className="w-full space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
        {!isLogin && (
            <>
            <div>
                <label className="block text-sm text-blue-accent mb-1">Nombre</label>
                <input
                type="text"
                name="firstName"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-blue-dark text-white placeholder-gray-400 border border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
            </div>
            <div>
                <label className="block text-sm text-blue-accent mb-1">Apellido</label>
                <input
                type="text"
                name="lastName"
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-blue-dark text-white placeholder-gray-400 border border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
            </div>
            <div>
                <label className="block text-sm text-blue-accent mb-1">DNI</label>
                <input
                type="text"
                name="dni"
                placeholder="12345678"
                value={formData.dni}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-blue-dark text-white placeholder-gray-400 border border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
                />
                {errors.dni && <p className="text-red-500 text-sm mt-2">{errors.dni}</p>}
            </div>
            </>
        )}

        <div>
            <label className="block text-sm text-blue-accent mb-1">Email</label>
            <input
            type="email"
            name="email"
            placeholder="ejemplo@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-md bg-blue-dark text-white placeholder-gray-400 border border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        </div>

        <div className="relative">
            <label className="block text-sm text-blue-accent mb-1">Password</label>
            <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 rounded-md bg-blue-dark text-white placeholder-gray-400 border border-blue-accent focus:outline-none focus:ring-2 focus:ring-blue-accent transition"
            />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-11 right-3 flex items-center text-blue-accent"
            >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
        </div>
        {errors.general && <p className="text-red-500 mt-2">{errors.general}</p>}
        <button
            type="submit"
            className="w-full bg-blue-accent text-blue-dark font-semibold py-2 rounded-md hover:bg-opacity-90 transition"
        >
            {isLogin ? 'Entrar' : 'Registrarse'}
        </button>
        </motion.form>
    );
}
