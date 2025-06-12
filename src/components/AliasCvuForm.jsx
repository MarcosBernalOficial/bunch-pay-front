import { useEffect, useState } from 'react';
import DashboardFooter from './DashboardFooter';
import api from '../utils/api';

export default function AliasCvuForm() {
    const [alias, setAlias] = useState('');
    const [originalAlias, setOriginalAlias] = useState('');
    const [cvu, setCvu] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/accountClient/summary')
            .then(res => {
                setAlias(res.data.alias);
                setOriginalAlias(res.data.alias);
                setCvu(res.data.cvu);
            })
            .catch(err => {
                console.error('Error al obtener Alias/CVU:', err);
                setError('No se pudo cargar el Alias y CVU.');
            });
    }, []);

    const handleSave = async () => {
        setError('');
        setSuccess('');

        if (!alias.trim()) {
            setError('El alias no puede estar vacío.');
            return;
        }

        if (alias.length < 6 || alias.length > 20) {
            setError('El alias debe tener entre 6 y 20 caracteres.');
            return;
        }

        if (alias === originalAlias) {
            setError('No realizaste ningún cambio en el alias.');
            return;
        }

        setLoading(true);
        try {
            const res = await api.patch('/accountClient/alias', { newAlias: alias });
            setSuccess(res.data || 'Alias actualizado correctamente.');
            setOriginalAlias(alias);
        } catch (err) {
            if (err.response) {
                const status = err.response.status;
                const msg = err.response.data.message || 'Error al actualizar el alias.';

                if (status === 400) {
                    setError(msg);
                } else if (status === 409) {
                    setError('El alias ya está en uso. Elegí otro.');
                } else if (status === 500) {
                    setError('Error interno del servidor. Intentá más tarde.');
                } else {
                    setError(msg);
                }
            } else {
                setError('Error de conexión con el servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-blue-dark">
            <div className="flex-grow flex items-center justify-center p-6">
                <div className="bg-blue-mid border border-blue-accent rounded-2xl shadow-xl p-8 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-blue-accent text-center mb-6">
                        Alias y CVU
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm text-blue-accent font-semibold">Alias</label>
                            <input
                                type="text"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                className={`w-full bg-blue-dark text-white border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring ${
                                    error ? 'border-red-500 ring-red-500' : 'border-blue-accent focus:ring-blue-accent'
                                }`}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-blue-accent font-semibold">CVU</label>
                            <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1">
                                {cvu || 'Cargando...'}
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className={`w-full mt-4 py-2 rounded-md text-white font-semibold transition ${
                                loading
                                    ? 'bg-blue-900 cursor-wait'
                                    : 'bg-blue-accent hover:bg-blue-400'
                            }`}
                        >
                            {loading ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full px-4 py-4 border-t border-blue-accent bg-blue-mid">
                <div className="max-w-screen-xl mx-auto">
                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}
