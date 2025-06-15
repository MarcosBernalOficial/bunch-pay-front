import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import SupportUserForm from "../components/SupportUserForm";
import EditSupportForm from "../components/EditSupportForm";

export default function AdminPanel() {
    const [supports, setSupports] = useState([]);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [editingSupport, setEditingSupport] = useState(null);
    const navigate = useNavigate();

    const fetchSupports = async () => {
        try {
            const res = await api.get("/support/all");
            setSupports(res.data);
        } catch (err) {
            console.error("Error al obtener soportes:", err);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    useEffect(() => {
        fetchSupports();
    }, []);

    return (
        <div className="p-6 bg-blue-dark min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-blue-accent text-center">
                Panel de Administrador
            </h1>

            {/* Formulario para crear nuevo soporte */}
            <SupportUserForm onSuccess={fetchSupports} />

            {/* Lista de soportes existentes */}
            <div className="mt-10 max-w-xl mx-auto">
                <h2 className="text-lg font-semibold text-blue-accent mb-2">
                    Soportes existentes
                </h2>
                <ul className="space-y-2 bg-blue-mid p-4 rounded-xl border border-blue-accent">
                    {supports
                        .filter((s) => s.role !== "ADMIN")
                        .map((s) => (
                            <li
                                key={s.id}
                                className="bg-blue-dark text-white p-2 rounded-md text-sm flex justify-between items-center"
                            >
                                <div>
                                    <p>{s.firstName} {s.lastName}</p>
                                    <p className="text-blue-accent text-xs">{s.email}</p>
                                </div>
                                <button
                                    onClick={() => setEditingSupport(s)}
                                    className="ml-2 px-3 py-1 bg-blue-accent text-blue-dark rounded hover:brightness-110 text-sm"
                                >
                                    Editar
                                </button>
                            </li>
                        ))}
                </ul>
            </div>

            {/* Formulario de edición */}
            {editingSupport && (
                <EditSupportForm
                    support={editingSupport}
                    onCancel={() => setEditingSupport(null)}
                    onSave={() => {
                        setEditingSupport(null);
                        fetchSupports();
                    }}
                />
            )}

            {/* Botón para cerrar sesión */}
            <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-500 transition mx-auto block mt-6"
            >
                Cerrar sesión
            </button>

            {/* Modal de confirmación */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-blue-dark text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">¿Cerrar sesión?</h2>
                        <p className="text-sm mb-6">
                            ¿Estás seguro de que querés cerrar sesión?
                        </p>
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
        </div>
    );
}
