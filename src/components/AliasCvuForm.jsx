import { useEffect, useState } from 'react';
import DashboardFooter from './DashboardFooter';
import api from '../utils/api';

export default function AliasCvuForm() {
    const [alias, setAlias] = useState('');
    const [cvu, setCvu] = useState('');

    useEffect(() => {
        api.get('/accountClient/summary')
            .then(res => {
                setAlias(res.data.alias);
                setCvu(res.data.cvu);
            })
            .catch(err => console.error('Error al obtener Alias/CVU:', err));
    }, []);

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
                            <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1">
                                {alias || 'Cargando...'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-blue-accent font-semibold">CVU</label>
                            <div className="w-full bg-blue-dark text-white border border-blue-accent rounded-lg px-3 py-2 mt-1">
                                {cvu || 'Cargando...'}
                            </div>
                        </div>
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
