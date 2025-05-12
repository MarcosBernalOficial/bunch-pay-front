
function LogoutModal({ onConfirm, onCancel }) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-surface rounded-xl p-6 text-center shadow-lg border border-primary">
            <h2 className="text-lg font-texto text-primary mb-4">¿Cerrar sesión?</h2>
            <div className="flex justify-center gap-4">
            <button
                onClick={onConfirm}
                className="bg-red-600 text-textPrimary px-4 py-2 rounded hover:bg-red-700 transition"
            >
                Sí
            </button>
            <button
                onClick={onCancel}
                className="bg-primaryLight text-background px-4 py-2 rounded hover:bg-primary transition"
            >
                No
            </button>
            </div>
        </div>
        </div>
    );
}

export default LogoutModal;
